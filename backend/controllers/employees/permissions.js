//error response middleware
const ErrorResponse = require('../../utils/errorResponse')

//modles
const Permissions = require('../../models/employees/permission')


exports.addPermission = async (req, res, next) => {
    try {
        const { permissionName, departmentId } = req.body

        //check if Permission Name AND has Department ID a value
        if(!permissionName || !departmentId){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Permission name AND Department ID are required", 406))
        }

        const lowercasePermissionName = permissionName.toLowerCase();

        //create a Permission
        const permission = await Permissions.create({
            name:lowercasePermissionName,
            departmentId
        })

        //check if creating a Permission did not wrok 
        if(!permission){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Permission Created",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editPermission = async (req, res, next) => {
    try {
        const { permissionId } = req.params
        const { permissionName, departmentId } = req.body

        //check if type Permission Name or permissionId dose not have a value
        if(!permissionName || !permissionId || !departmentId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Permission name AND Permission ID AND Department ID are required", 406))
        }

        const lowercasePermissionName = permissionName.toLowerCase();

        //update a Permission
        const permission = await Permissions.update({
            name:lowercasePermissionName,
            departmentId
        },{
            where:{
                id:permissionId
            }
        })


        //check if updating a Permission did not wrok 
        if(permission[0] === 0){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Permission Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removePermission = async (req, res, next) => {
    try {
        const { permissionId } = req.params

        //check if permissionId dose not have a value
        if(!permissionId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Permission ID is required", 406))
        }

        //Delete Permission where Id Equal the roleId
        const permission = await Permissions.destroy({
            where: {
                id: permissionId
            }
        });

        //check if deleting a Permission did not wrok 
        if(!permission){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or permissionId is not found!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Permission Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}