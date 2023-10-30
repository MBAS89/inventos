//db 
const db = require('../../../db')

//error response middleware
const ErrorResponse = require('../../errorResponse')


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
        const isStoreThereResponse = await db.query(
            'SELECT * FROM stores WHERE store_name = $1',
            [store_name]
        )

        if(isStoreThereResponse.rows.length > 0){
            return next(new ErrorResponse("Store Name Is Taken Use Diffrent Name", 406));
        }

        
    

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateCreateStore;

