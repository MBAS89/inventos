const sequelize = require('../config/database');
const { Op } = require('sequelize');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//reusable funtions 
const {getOrderOptions} = require('../utils/functions/orderOptions')

//modles
const { Invoices, InvoiceItems } = require('../models/sales/invoices');
const Products = require('../models/inventory/products');
const Employees = require('../models/employees/employees');
const Customers = require('../models/cutomers/cutomers');
const CustomerTypes = require('../models/cutomers/customersTypes');
const { OuterInvoices, OuterInvoiceItems } = require('../models/sales/outerInvoices');
const OldInventory = require('../models/inventory/oldInventory');
const Suppliers = require('../models/suppliers/suppliers');
const SuppliersTypes = require('../models/suppliers/suppliersType');


exports.readSingleOuterInvoice = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { invoiceId } = req.query;

        if (!invoiceId || !storeId) {
            return next(new ErrorResponse('Invoice  ID and Store ID are required', 400));
        }
        
        const invoice = await OuterInvoices.findOne({
            where: { 
                store_id: storeId,
                id: invoiceId
            },
            include: [
                {
                    model: OuterInvoiceItems,
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
                    model:Suppliers,
                    attributes: ['id', 'supplier_name', 'image'],
                    include:[
                        {
                            model:SuppliersTypes
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

exports.readOuterInvoices = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id

        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await OuterInvoices.count({ where: { store_id: storeId } });

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

        const invoices = await OuterInvoices.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            include: [
                {
                    model: OuterInvoiceItems,
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
                },
                {
                    model:Suppliers,
                    attributes: ['id', 'supplier_name', 'image'],
                    include:[
                        {
                            model:SuppliersTypes,
                            attributes: ['id', 'type_name'],
                        }
                    ]
                }
            ]
        });

    
        return res.status(200).json({ totalCount, totalPages, currentPage, invoices });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.createOuterInvoice = async (req, res, next) => {

    try {

        const store_id = req.authData.store_id

        //retrieve values from req.body  
        const { total_amount, extra_discount, total_to_pay, total_due, total_paid, 
            status, employeeId, suppliersId, items, inventoryStatus
        } = req.body

        //calculate total cost 
        const totalCost = items.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.qty * currentItem.cost);
        }, 0);

        //create invoice
        const invoice = await OuterInvoices.create({
            total_amount,
            extra_discount: extra_discount || 0,
            total_to_pay,
            total_due,
            total_paid,
            total_cost:totalCost,
            last_paid_date:new Date(),
            fully_paid_date:total_paid === total_to_pay ? new Date() : null,
            status,
            employeeId:employeeId || null,
            suppliersId:suppliersId || null,
            store_id
        });


        // Add items to the invoice one by one
        for (const item of items) {
            await OuterInvoiceItems.create({
                product_id:item.product_id,
                qty: item.qty,
                invoiceId:invoice.id,
                outerInvoiceId:invoice.id
            });

            // Check If Price Changes 
            const product = await Products.findOne({
                where: { product_id: item.product_id }
            })

            if (product) {
                if(product.cost_unit !== item.costUnit || (item.piecesPerUnit > 1 ? product.cost_piece !== item.costPiece : false)){
                    //price change we will create an old inventory with all the old
                    if(inventoryStatus === 'sell-on-old-price'){ //sell all on old prices reatil wholeSale and Sale price even though cost change 
                        await OldInventory.create({
                            status:inventoryStatus,
                            cost_unit:product.cost_unit,
                            pieces_per_unit:item.piecesPerUnit,
                            retail_price_unit:product.retail_price_unit,
                            wholesale_price_unit:product.wholesale_price_unit,
                            cost_piece:product.cost_piece,
                            retail_price_piece:product.retail_price_piece,
                            wholesale_price_piece:product.wholesale_price_piece,
                            qty:product.qty,
                            sale_price_unit:product.sale_price_unit,
                            sale_price_piece:product.sale_price_piece,
                            on_sale:product.on_sale,
                            store_id,
                            product_id: product.product_id
                        })


                        await Products.update(
                            { 
                                qty: item.qty,
                            },
                            { where: { product_id: item.product_id }}
                        );
                    }else{
                        await OldInventory.create({
                            status:inventoryStatus,
                            pieces_per_unit:item.piecesPerUnit,
                            cost_unit: inventoryStatus === 'sell-this-on-old-price' ? product.cost_unit : item.costUnit,
                            retail_price_unit: inventoryStatus === 'sell-this-on-old-price' ? product.retail_price_unit : item.retailPriceUnit,
                            wholesale_price_unit:inventoryStatus === 'sell-this-on-old-price' ? product.wholesale_price_unit : item.wholeSalePriceUnit,
                            cost_piece:inventoryStatus === 'sell-this-on-old-price' ? product.cost_piece : item.costPiece,
                            retail_price_piece: inventoryStatus === 'sell-this-on-old-price' ? product.retail_price_piece : item.retailPricePiece,
                            wholesale_price_piece: inventoryStatus === 'sell-this-on-old-price' ? product.wholesale_price_piece : item.wholeSalePricePiece,
                            qty:product.qty,
                            sale_price_unit:inventoryStatus === 'sell-this-on-old-price' ? product.sale_price_unit:item.salePriceUnit,
                            sale_price_piece:inventoryStatus === 'sell-this-on-old-price' ? product.sale_price_piece:item.salePriceUnit,
                            on_sale:inventoryStatus === 'sell-this-on-old-price' ? product.on_sale:item.salePriceUnit ? true : false,
                            store_id,
                            product_id: product.product_id
                        })


                        await Products.update(
                            { 
                                qty: item.qty,
                                cost_unit:item.costUnit,
                                retail_price_unit:item.retailPriceUnit,
                                wholesale_price_unit:item.wholeSalePriceUnit,
                                cost_piece:item.costPiece,
                                retail_price_piece:item.retailPricePiece,
                                wholesale_price_piece:item.wholeSalePricePiece,
                                sale_price_unit:item.salePriceUnit,
                                sale_price_piece:item.salePricePeice
                            },
                            { where: { product_id: item.product_id }}
                        );
                    }

                }else{
                    //price did not change add new qty to inventory
                    const updatedQty = product.qty + item.qty;
                    await Products.update(
                        { qty: updatedQty },
                        { where: { product_id: item.product_id }}
                    );
                }

            } else {
                return next(new ErrorResponse(`Product with ID ${item.product_id} not found.`, 404));
            }
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Outer Invoice Created",
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

exports.removeOuterInvoice = async (req, res, next) => {

    // Begin a transaction
    const transaction = await sequelize.transaction();

    try {
        //retrieve invoiceId from the req params
        const { invoiceId } = req.params

        // Delete the invoice where invoice_id = invoiceId
        await OuterInvoices.destroy({
            where: { id: invoiceId },
            transaction
        });

        // Delete associated items where invoice_id = invoiceId
        await OuterInvoiceItems.destroy({
            where: { invoiceId: invoiceId },
            transaction
        });

        // Commit the transaction
        await transaction.commit();

        // Send success response
        res.status(200).json({
            status: "success",
            message: "Outer Invoice Deleted",
            results:1
        });

    } catch (error) {
        // Rollback the transaction if any error occurs
        await transaction.rollback();
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addOuterInvoiceHelper = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        const suppliers = await Suppliers.findAll({
            where:{
                store_id
            },
            attributes:['id','supplier_name'],
            include:[
                {
                    model:SuppliersTypes,
                    attributes:['id','type_name']
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
        res.status(200).json({suppliers, employees});

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}