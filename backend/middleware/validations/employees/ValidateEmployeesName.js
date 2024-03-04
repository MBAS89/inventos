//modle
const Employees = require('../../../models/employees/employees');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing 
const ValidateEmployeesName = async (req, res, next) => {
    try {
        //retrieve Employee name from req query to check if the Employee name is used before uploading to cloudinary
        const store_id = req.authData.store_id
        const { employeeEmail } = req.query

        // Check if all fields are present
        if (!employeeEmail || !store_id) {
            return next(new ErrorResponse("Employee Email And Store ID Is required", 422));
        }

        if (req.path.includes('/remove')) {
            next();
        }else if(req.path.includes('/edit')){
            next();
        }else{
            // Check if the Employee name is already exists
            const existingEmployee = await Employees.findOne({
                where: {
                    email: employeeEmail,
                    store_id: store_id
                }
            });

            //if it there throw an error 
            if (existingEmployee) {
                return next(new ErrorResponse("Employee Already Exists. Please Use a Different Name", 406));
            }

            next();
        }

    } catch (error) {
        next(error);
    }

};

module.exports = ValidateEmployeesName;