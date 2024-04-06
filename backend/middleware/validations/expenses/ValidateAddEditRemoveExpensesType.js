//error response middleware
const ErrorResponse = require('../../../utils/errorResponse');

//reusable function for checking requaired fileds 
const { checkRequiredFields } = require('../../../utils/functions/checkRequiredFileds');

//models
const ExpensesTypes = require('../../../models/expenses/expensesType');

// Validation middleware for add edit and remove supplier type 
const ValidateAddEditRemoveExpensesType = async (req, res, next) => {
    try {

        const store_id = req.authData.store_id

        const { type_name } = req.body
        //declare a variable that takes all the required fileds
        let requiredFields;

        //if the route path is /add we required specific field  
        if (req.path.includes('/add')) {

            requiredFields = ['type_name'];

        //if the route path is /edit we required specific field  
        }else if(req.path.includes('/edit')){

            requiredFields = ['type_name'];

            //check if the typeId have value
            if(!req.query.typeId ){
                // If not response will error message 
                return next(new ErrorResponse("Type ID Required!", 406));
            }

            // Check if a type with the provided typeid exists
            const expensesTypes = await ExpensesTypes.findOne({
                where: { id: req.query.typeId }
            });
    
            if (!expensesTypes) {
                // If the type doesn't exist, return a 406 mean not accepted
                return next(new ErrorResponse("Type Not Found!", 406));
            }

        //if the route path is not /add or /edit that mean this will work for /remove 
        }else{

            if(!req.query.typeId ){
                // If the type doesn't have value
                return next(new ErrorResponse("Type ID Required!", 406));
            }

            // Check if a type with the provided typeid exists
            const expensesTypes = await ExpensesTypes.findOne({
                where: { id: req.query.typeId }
            });
    
            if (!expensesTypes) {
                // If the type doesn't exist, return a 406 mean not accepted
                return next(new ErrorResponse("Type Not Found!", 406));
            }

            requiredFields = []
        }

        //Check if all Required Fileds are there
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        if(req.path.includes('/edit') || req.path.includes('/add')){
            const type = await ExpensesTypes.findOne({
                where: { 
                    type_name: type_name,
                    store_id 
                }
    
            });
    
            if(type){
                //this Will Tell the user which fields they need to fill
                return next(new ErrorResponse('Type Is ALready There', 406));
            }
        }


        next();
    } catch (error) {
        next(error);
    }

};

module.exports = ValidateAddEditRemoveExpensesType;