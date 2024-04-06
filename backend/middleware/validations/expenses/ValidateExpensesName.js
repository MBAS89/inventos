//modle
const Expenses = require('../../../models/expenses/expenses');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing 
const ValidateExpensesName = async (req, res, next) => {
    try {
        const store_id = req.authData.store_id
        //retrieve Supplier name from req query to check if the Supplier name is used before uploading to cloudinary
        const { expenses_title } = req.body

        // Check if all fields are present
        if (!expenses_title || !store_id) {
            return next(new ErrorResponse("Expenses Title  And Store ID Is required", 422));
        }


        // Check if the Supplier name is already exists
        const existingTitle  = await Expenses.findOne({
            where: {
                expenses_title,
                store_id
            }
        });

        //if it there throw an error 
        if (existingTitle) {
            return next(new ErrorResponse("Expenses Already Exists. Please Use a Different Title", 406));
        }

        next();

    } catch (error) {
        next(error);
    }

};

module.exports = ValidateExpensesName;