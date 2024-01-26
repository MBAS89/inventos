//modle
const Stores = require('../../../models/sotres/stores');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating a store
const validateCreateStore = async (req, res, next) => {
    try {

        const { store_name, owner_first_name, owner_last_name, owner_email, password, confirm_password, phone_number} = req.body

        // Check if all fields are present
        if (!store_name || !owner_first_name || !owner_last_name || !owner_email || !password || !confirm_password || !phone_number) {
            return next(new ErrorResponse("All Fields Are Required", 422));
        }

        //check if passwords match
        if(password !== confirm_password){
            return next(new ErrorResponse("Passwords Do Not Match", 406));
        }

        //check store name in my database
        const existingStore = await Stores.findOne({
            where: {
                store_name
            }
        });
    
        if (existingStore) {
            return next(new ErrorResponse("Store Name Is Taken. Please Use a Different Name", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateCreateStore;

