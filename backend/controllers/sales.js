const sequelize = require('../config/database');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//modles
const { Invoices, InvoiceItems } = require('../models/sales/invoices')



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