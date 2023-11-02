//error response middleware
const ErrorResponse = require('../../../utils/errorResponse');

//reusable function for checking requaired fileds 
const { checkRequiredFields } = require('../../../utils/functions/checkRequiredFileds');


// Validation middleware for creating an invoice
const validateCreateAndEditInvoice = async (req, res, next) => {
    try {

        let requiredFields;
        if (req.path.includes('/create')) {
            requiredFields = ['total_amount', 'items_discount', 'total_discount', 'total_to_pay', 'total_due', 'total_paid', 'status', 'store_id'];
        }else{
            requiredFields = ['total_amount', 'items_discount', 'total_discount', 'total_to_pay', 'total_due', 'total_paid', 'status'];
        }

        //Check if all Required Fileds are there
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateCreateAndEditInvoice;