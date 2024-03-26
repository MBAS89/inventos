//error response middleware
const ErrorResponse = require('../../../utils/errorResponse');

//modle
const { OuterInvoices } = require('../../../models/sales/outerInvoices');

// Validation middleware for creating an invoice
const validateDeleteAndEditOuterInvoice = async (req, res, next) => {
    try {
        const { invoiceId } = req.params

        // Check if an invoice with the provided invoiceId exists
        const invoice = await OuterInvoices.findOne({
            where: { id: invoiceId }
        });

        if (!invoice) {
            // If the invoice doesn't exist, return a 404 error
            return next(new ErrorResponse("Invoice ID Required OR Not Found!", 406));
        }

        // If the invoice exists, continue with the next middleware
        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateDeleteAndEditOuterInvoice;