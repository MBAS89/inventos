//modle
const Admins = require('../../../models/sotres/admins');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for adding an admin
const validateAddAdmin = async (req, res, next) => {
    try {

        const { first_name, last_name, email, password, confirm_password, phone_number } = req.body

        // Check if all fields are present
        if (!first_name || !last_name || !email || !password || !confirm_password || !phone_number) {
            return next(new ErrorResponse("All Fields Are Required", 422));
        }

        //check if passwords match
        if(password !== confirm_password){
            return next(new ErrorResponse("Passwords Do Not Match", 406));
        }

        //check if admin in database
        const existingAdmin = await Admins.findOne({
            where: {
                email
            }
        });
    
        if (existingAdmin) {
            return next(new ErrorResponse("Invalid Email Or Password", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddAdmin;

