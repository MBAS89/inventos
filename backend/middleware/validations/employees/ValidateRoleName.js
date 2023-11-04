//modle
const Roles = require('../../../models/employees/roles');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing 
const ValidateRoleName = async (req, res, next) => {
    try {
        //retrieve Rle name from req query to check if the Role name is used before in the same store 
        const { roleName, storeId } = req.body

        // Check if all fields are present
        if (!roleName || !storeId) {
            return next(new ErrorResponse("Role Name And Store ID Is required", 422));
        }

        // Check if the Role name is already exists in the store
        const existingRole = await Roles.findOne({
            where: {
                name: roleName,
                store_id: storeId
            }
        });

        //if it there throw an error 
        if (existingRole) {
            return next(new ErrorResponse("Role Already Exists. Please Use a Different Name", 406));
        }

        next();

    } catch (error) {
        next(error);
    }

};

module.exports = ValidateRoleName;