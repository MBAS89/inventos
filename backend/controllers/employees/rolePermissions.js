//error response middleware
const ErrorResponse = require('../../utils/errorResponse')

//modles
const RolePermissions = require('../../models/employees/rolePermission')


exports.addRolePermission = async (req, res, next) => {
    try {
        const { roleId, permissionId } = req.body;

        //check if Role ID AND has Permission ID a value
        if(!roleId || !permissionId){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Permission ID AND Role ID are required", 406))
        }

        //create a Role Permission
        const rolePermission = await RolePermissions.create({ roleId, permissionId });

        //check if creating a Role Permission did not wrok 
        if(!rolePermission){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Role Permission Created",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.removeRolePermission  = async (req, res, next) => {
    try {
        const { rolePermissionId } = req.params

        //check if rolePermissionId dose not have a value
        if(!rolePermissionId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Role Permission ID is required", 406))
        }

        //Delete Role Permission where Id Equal the roleId
        const rolePermission = await RolePermissions.destroy({
            where: {
                id: rolePermissionId
            }
        });

        //check if deleting a Role Permission did not wrok 
        if(!rolePermission){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or rolePermissionId is not found!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Role Permission Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}