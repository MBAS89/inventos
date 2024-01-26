//modle
const Admins = require('../../../models/sotres/admins');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for adding an admin
const validateAddAdmin = async (req, res, next) => {
    try {

        const { store_id, first_name, last_name, email, password, confirm_password, phone_number} = req.body

        // Check if all fields are present
        if (!store_id || !first_name || !last_name || !email || !password || !confirm_password || !phone_number) {
            return next(new ErrorResponse("All Fields Are Required", 422));
        }

        //check if passwords match
        if(password !== confirm_password){
            return next(new ErrorResponse("Passwords Do Not Match", 406));
        }

        /* 
            check if admin in database and he is admin for that store
            already becease he can be an admin for other
            stores and this is not an issue
        */
        const existingAdmin = await Admins.findOne({
            where: {
                email,
                store_id
            }
        });
    
        if (existingAdmin) {
            return next(new ErrorResponse("User Already an Admin for This Store", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddAdmin;

