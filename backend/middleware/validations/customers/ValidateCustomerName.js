//modle
const Customers = require('../../../models/cutomers/cutomers');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing a category
const ValidateCustomerName = async (req, res, next) => {
    try {

        //retrieve Customer name from req query to check if the Customer name is used before uploading to cloudinary
        const storeId = req.authData.store_id
        const { cutomerName } = req.query

        // Check if all fields are present
        if (!cutomerName) {
            return next(new ErrorResponse("Customer Name Is required", 422));
        }

        if(!storeId){
            return next(new ErrorResponse("Store ID Is required", 422));
        }

        // Check if the Customer name is already exists
        const existingCustomer = await Customers.findOne({
            where: {
                full_name: cutomerName,
                store_id:storeId
            }
        });

        //if it there throw an error 
        if (existingCustomer) {
            return next(new ErrorResponse("Customer Already Exists. Please Use a Different Name", 406));
        }

        next();
    } catch (error) {
        console.log(error)
        next(error);
    }

};

module.exports = ValidateCustomerName;