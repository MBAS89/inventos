//error response middleware
const ErrorResponse = require('../../../utils/errorResponse');

//reusable function for checking requaired fileds 
const { checkRequiredFields } = require('../../../utils/functions/checkRequiredFileds');

//models
const CustomersTypes = require('../../../models/cutomers/customersTypes');

// Validation middleware for creating an invoice
const ValidateAddEditRemoveCustomerType = async (req, res, next) => {
    try {
        
        let requiredFields;
        if (req.path.includes('/add')) {
            requiredFields = ['store_id', 'type_name', 'discount_value'];
        }else if(req.path.includes('/edit')){
            requiredFields = ['type_name', 'discount_value'];

            // Check if a type with the provided typeid exists
            const ctomerType = await CustomersTypes.findOne({
                where: { id: req.params.typeId }
            });
    
            if (!ctomerType) {
                // If the type doesn't exist, return a 406 mean not accepted
                return next(new ErrorResponse("Type ID Required OR Not Found!", 406));
            }

        }else{
            // Check if a type with the provided typeid exists
            const ctomerType = await CustomersTypes.findOne({
                where: { id: req.params.typeId }
            });
    
            if (!ctomerType) {
                // If the type doesn't exist, return a 406 mean not accepted
                return next(new ErrorResponse("Type ID Required OR Not Found!", 406));
            }

            requiredFields =[]
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

module.exports = ValidateAddEditRemoveCustomerType;