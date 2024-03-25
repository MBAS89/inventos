const sequelize = require('../config/database');
const { Op } = require('sequelize');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//modles
const { Invoices, InvoiceItems } = require('../models/sales/invoices');
const Products = require('../models/inventory/products');
const Employees = require('../models/employees/employees');
const Customers = require('../models/cutomers/cutomers');
const CustomerTypes = require('../models/cutomers/customersTypes')

//reusable funtions 
const {getOrderOptions} = require('../utils/functions/orderOptions');
const OldInventory = require('../models/inventory/oldInventory');

exports.readSingleInvoice = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { invoiceId } = req.query;

        if (!invoiceId || !storeId) {
            return next(new ErrorResponse('Invoice  ID and Store ID are required', 400));
        }
        
        const invoice = await Invoices.findOne({
            where: { 
                store_id: storeId,
                id: invoiceId
            },
            include: [
                {
                    model: InvoiceItems,
                    as: 'items',
                    include: [
                        {
                            model: Products,
                            attributes: [
                                'product_id', 'name', 'image', 'sku', 'unit', 'retail_price_unit',
                                'retail_price_piece', 'unit_value', 'pieces_per_unit', 'sale_price_unit',
                                'sale_price_piece', 'wholesale_price_piece', 'wholesale_price_unit',
                                'unit_of_measurement', 'unit_catergory', 'qty'
                            ]
                        }
                    ]
                },
                {
                    model:Employees,
                    attributes: ['id', 'full_name', 'image'],
                },
                {
                    model:Customers,
                    attributes: ['id', 'full_name', 'image'],
                    include:[
                        {
                            model:CustomerTypes,
                            as: 'customerType'
                        }
                    ]
                }
            ]
        })

        if(!invoice){
            return  next(new ErrorResponse('No Invoice Found!', 404))
        }

        return res.status(200).json(invoice);

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readInvoices = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id

        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Invoices.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { full_name: { [Op.iLike]: `%${searchQuery}%` } },
                { email: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.iLike]: `%${searchQuery}%` } },
            ]
        } : { store_id: storeId };

        const invoices = await Invoices.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            include: [
                {
                    model: InvoiceItems,
                    as: 'items',
                    include: [
                        {
                            model: Products,
                            attributes: ['product_id', 'name', 'image', 'sku']
                        }
                    ]
                },
                {
                    model:Employees,
                    attributes: ['id', 'full_name', 'image'],
                }
            ]
        });

    
        return res.status(200).json({ totalCount, totalPages, currentPage, invoices });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}



exports.createInvoice = async (req, res, next) => {

    try {

        const store_id = req.authData.store_id

        //retrieve values from req.body  
        const { total_amount, items_discount, extra_discount, total_discount, customer_discount, 
            total_to_pay, total_due, total_paid, status, items, customerId,
            employeeId, customer_extra_info, includeItemsDiscount
        } = req.body

        //calculate total cost 
        const totalCost = items.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.qty * currentItem.cost);
        }, 0);

        const totalEstimatedProfit = total_to_pay - totalCost
        const totalProfit = total_paid - totalCost

        //create invoice
        const invoice = await Invoices.create({
            total_amount,
            items_discount,
            total_profit_now:totalProfit,
            total_profit_estimated:totalEstimatedProfit,
            total_cost:totalCost,
            last_paid_date:new Date(),
            fully_paid_date:total_to_pay === total_paid ? new Date() : null,
            customer_discount:customer_discount.toFixed(2),
            extra_discount: extra_discount || 0,
            total_discount,
            total_to_pay,
            total_due,
            total_paid,
            status,
            employeeId:employeeId || null,
            customerId:customerId || null,
            customer_extra_info,
            store_id
        });

        let customer
        if(customerId){
            customer = await Customers.findOne({
                where:{
                    id:customerId
                },
                attributes:['id','full_name'],
                include:[
                    {
                        model:CustomerTypes,
                        as:'customerType',
                        attributes:['id','discount_value','wholeSalePrice']
                    }
                ]
            })
        }
        



        // Add items to the invoice one by one
        for (const item of items) {
            await InvoiceItems.create({
                product_id:item.product_id,
                qty: item.qty,//
                profit:customer ? 
                    !customer.customerType.wholeSalePrice ?
                            includeItemsDiscount ? 
                                item.piecesPerUnit > 1 ? 
                                    ((item.qty * item.salePricePeice) * (customer.customerType.discount_value / 100)) - (item.qty * item.cost) 
                                : ((item.qty * item.salePriceUnit) * (customer.customerType.discount_value / 100)) - (item.qty * item.cost) 
                            : ((item.qty * item.price) * (customer.customerType.discount_value / 100)) - (item.qty * item.cost) 
                        :   includeItemsDiscount ?  
                                item.piecesPerUnit > 1 ? 
                                    ((item.qty * item.wholeSalePrice) - ((item.qty * item.price) - (item.qty * item.salePricePeice))) - (item.qty * item.cost)
                                :
                                ((item.qty * item.wholeSalePrice) - ((item.qty * item.price) - (item.qty * item.salePriceUnit))) - (item.qty * item.cost)
                            :   (item.qty * item.wholeSalePrice) - (item.qty * item.cost)  
                    : item.piecesPerUnit > 1 ? 
                        (item.qty * (item.salePricePeice ? 
                            item.salePricePeice 
                        : item.price)) - (item.qty * item.cost) 
                    : (item.qty * (item.salePriceUnit ? 
                        item.salePriceUnit 
                    : item.price)) - (item.qty * item.cost),
                cost:item.cost * item.qty,
                invoiceId:invoice.id
            });

            if(item.inventoryId){
                // Update product's inventory
                const inventory = await OldInventory.findOne({
                    where: { id: item.inventoryId }
                })

                if(inventory){
                    if(inventory.qty === item.qty){
                        await OldInventory.destroy({
                            where: { id: item.inventoryId }
                        });
                    }else if(inventory.qty > item.qty){
                        const updatedQty = inventory.qty - item.qty;
                        await OldInventory.update(
                            { qty: updatedQty },
                            { where:{ id: item.inventoryId }}
                        );
                    }else{
                        return next(new ErrorResponse(`Not enough qty in the inventory.`, 406));
                    }
                }else {
                    return next(new ErrorResponse(`Product with ID ${item.product_id} not found.`, 404));
                }

            }else{
                // Update product's inventory
                const product = await Products.findOne({
                    where: { product_id: item.product_id }
                })

                if (product) {
                    if(product.qty >= item.qty){
                        const updatedQty = product.qty - item.qty;
                        await Products.update(
                            { qty: updatedQty },
                            { where: { product_id: item.product_id }}
                        );
                    }else{
                        return next(new ErrorResponse(`Not enough qty in the inventory.`, 406));
                    }

                } else {
                    return next(new ErrorResponse(`Product with ID ${item.product_id} not found.`, 404));
                }
            }

        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Invoice Created",
            results:1,
            data: {
                invoice
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editInvoice = async (req, res, next) => {

    // Begin a transaction
    const transaction = await sequelize.transaction();

    try {

        //retrieve invoiceId from the req params
        const { invoiceId } = req.params
        
        //retrive old invoice 
        const oldInvoice = await InvoiceItems.findAll({
            where: { invoiceId: invoiceId}
        });

        // Update product quantities (inventory)
        for (const item of oldInvoice) {
            const product = await Products.findOne({
            where: { product_id: item.product_id },
            transaction
            });
    
            if (!product) {
                return next(new ErrorResponse(`Product ${item.product_id} not found`, 404));
            }
    
            const newQty = product.qty + item.qty;
            if (newQty < 0) {
                return next(new ErrorResponse(`Insufficient quantity for product ${item.product_id}`, 406));
            }
    
            await Products.update({ qty: newQty }, { where: { product_id: item.product_id }, transaction });
        }

        //retrieve values from req.body 
        const { total_amount, items_discount, extra_discount, total_discount, customer_discount, 
            total_to_pay, total_due, total_paid, status, items, customerId, employeeId
        } = req.body


        // Update the invoice with the new value
        const invoice = await Invoices.update(
            {
                total_amount,
                items_discount,
                customer_discount,
                extra_discount: extra_discount || 0,
                total_discount,
                total_to_pay,
                total_due,
                total_paid,
                status,
                employeeId:employeeId || null,
                customerId:customerId || null,
            },
            {
                where: { id: invoiceId },
                transaction
            }
        );

        //check if the invoice has been updated
        if(!invoice){
            //throw an error if the update did not succeed
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        // Delete existing items associated with the invoice
        await InvoiceItems.destroy({
            where: { invoiceId: invoiceId },
            transaction
        });

        // Insert new items associated with the invoice
        await InvoiceItems.bulkCreate(
            items.map(item => ({
                product_id: item.product_id,
                qty: item.qty,
                invoiceId: invoiceId
            })),
            { transaction }
        );

        // Update product quantities (inventory)
        for (const item of items) {
            const product = await Products.findOne({
            where: { product_id: item.product_id },
            transaction
            });
    
            if (!product) {
                return next(new ErrorResponse(`Product ${item.product_id} not found`, 404));
            }
    
            const newQty = product.qty - item.qty;
            if (newQty < 0) {
                return next(new ErrorResponse(`Insufficient quantity for product ${item.product_id}`, 406));
            }
    
            await Products.update({ qty: newQty }, { where: { product_id: item.product_id }, transaction });
        }

        // Commit the transaction
        await transaction.commit();

        // Send success response
        res.status(200).json({
            status: "success",
            message: "Invoice Updated",
            results:1,
        });


    } catch (error) {
        // Rollback the transaction if any error occurs
        await transaction.rollback();
        //if there is an error send it to the error middleware to be output in a good way 
        next(new ErrorResponse("Something went wrong!", 500));
    }
}


exports.removeInvoice = async (req, res, next) => {

    // Begin a transaction
    const transaction = await sequelize.transaction();

    try {
        //retrieve invoiceId from the req params
        const { invoiceId } = req.params

        // Delete the invoice where invoice_id = invoiceId
        await Invoices.destroy({
            where: { id: invoiceId },
            transaction
        });

        // Delete associated items where invoice_id = invoiceId
        await InvoiceItems.destroy({
            where: { invoiceId: invoiceId },
            transaction
        });

        // Commit the transaction
        await transaction.commit();

        // Send success response
        res.status(200).json({
            status: "success",
            message: "Invoice Deleted",
            results:1
        });

    } catch (error) {
        // Rollback the transaction if any error occurs
        await transaction.rollback();
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.addInvoiceHelper = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        const customers = await Customers.findAll({
            where:{
                store_id
            },
            attributes:['id','full_name'],
            include:[
                {
                    model:CustomerTypes,
                    as:'customerType',
                    attributes:['id','discount_value','wholeSalePrice', 'type_name']
                }
            ]
        })

        const employees = await Employees.findAll({
            where:{
                store_id
            },
            attributes: ['id', 'full_name'] 
        })

        // Send success response
        res.status(200).json({customers, employees});

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.casherProductSearch = async (req, res, next) => {
    try {
        const {searchQuery} = req.query
        const store_id = req.authData.store_id


        
        const product = await Products.findOne({
            where:{
                sku:searchQuery,
                store_id
            },
            include:{
                model:OldInventory,
                order: [['createdAt', 'ASC']] 
            }
        })

        if(product){
            // Send success response
            return res.status(200).json({type:'sku', product});
        }else{

            const productsUnitSku = await Products.findOne({
                where: sequelize.literal(`
                    store_id = ${store_id} AND 
                    EXISTS (
                        SELECT 1 FROM unnest("unit_of_measurement") AS elem WHERE elem->>'sku' ILIKE '${searchQuery}'
                    )
                `),
                include: [{
                    model: OldInventory,
                    order: [['createdAt', 'ASC']] 
                }],
            });

            if(productsUnitSku){
                return res.status(200).json({type:'unitSku', product:productsUnitSku});
            }

            if(!searchQuery){
                return res.status(200).json({})
            }

            const productsNameSearch = await Products.findAll({
                where:{ name: { [Op.iLike]: `%${searchQuery}%` }, store_id},
                include: [{
                    model: OldInventory,
                    order: [['createdAt', 'ASC']] 
                }]
            })

            // Send success response
            return res.status(200).json({type:'search', product:productsNameSearch});
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}