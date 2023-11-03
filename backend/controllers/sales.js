const sequelize = require('../config/database');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//modles
const { Invoices, InvoiceItems } = require('../models/sales/invoices');
const Products = require('../models/inventory/products');


exports.createInvoice = async (req, res, next) => {

    try {
        //retrieve values from req.body  
        const { total_amount, items_discount, extra_discount, total_discount, 
            total_to_pay, total_due, total_paid, status, store_id, items 
        } = req.body

        //create invoice
        const invoice = await Invoices.create({
            total_amount,
            items_discount,
            extra_discount: extra_discount || null,
            total_discount,
            total_to_pay,
            total_due,
            total_paid,
            status,
            store_id
        });

        // Add items to the invoice one by one
        for (const item of items) {
            await InvoiceItems.create({
                product_id:item.product_id,
                qty: item.qty,
                invoiceId:invoice.id
            });

            // Update product's inventory
            const product = await Products.findOne({
                where: { product_id: item.product_id }
            })

            if (product) {
                const updatedQty = product.qty - item.qty;
                await Products.update(
                    { qty: updatedQty },
                    { where: { product_id: item.product_id }}
                );
            } else {
                console.error(`Product with ID ${item.product_id} not found.`);
                // Handle error or log it accordingly
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
        const { total_amount, items_discount, extra_discount, total_discount, 
            total_to_pay, total_due, total_paid, status, items 
        } = req.body


        // Update the invoice with the new value
        const invoice = await Invoices.update(
            {
                total_amount,
                items_discount,
                extra_discount: extra_discount || null,
                total_discount,
                total_to_pay,
                total_due,
                total_paid,
                status
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