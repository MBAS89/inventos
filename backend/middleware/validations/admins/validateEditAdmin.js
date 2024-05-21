//modle
const Admins = require('../../../models/sotres/admins');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

const { Op } = require('sequelize');

// Validation middleware for editing an admin
const validateEditAdmin = async (req, res, next) => {
    try {

        //retrieve admin id from req query
        const { adminId } = req.query

        if(!adminId){
            return next(new ErrorResponse("A Admin ID Is Required", 406))
        }

        //retrieve values from req body
        const { first_name, last_name, email, password, confirm_password, phone_number } = req.body

        // Check if all fields are present
        if (!first_name || !last_name || !email || !phone_number) {
            return next(new ErrorResponse("All Fields Are Required", 422));
        }

        //check if passwords match
        if(password){
            if(password !== confirm_password){
                return next(new ErrorResponse("Passwords Do Not Match", 406));
            }
        }

        //check if this email is used by another admin
        const existingAdmin = await Admins.findOne({
            where: {
                email,
                id: { [Op.ne]: adminId }
            }
        });
    
        if (existingAdmin) {
            return next(new ErrorResponse("Invalid Email", 406));
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateEditAdmin;

