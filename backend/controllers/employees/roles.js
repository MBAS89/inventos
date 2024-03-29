//error response middleware
const ErrorResponse = require('../../utils/errorResponse')

//modles
const Roles = require('../../models/employees/roles')
const Permissions = require('../../models/employees/permission');
const Departments = require('../../models/employees/department');

exports.readRole= async (req, res, next) => {
    try {

        const { employeeId } = req.query

        const role = await Roles.findOne({
            where:{ id:employeeId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Permissions,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    through: {
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    include: [
                        {
                            model: Departments,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
            order: [['id', 'ASC']]
        });

        return res.status(200).json({ role })
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readRoles= async (req, res, next) => {
    try {
        const { store_id } = req.authData

        //check if store ID is there 
        if(!store_id){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Store ID is required", 406))
        }

        const roles = await Roles.findAll({
            where:{ store_id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
              model: Permissions,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              through: {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            }],
            order: [['id', 'ASC']] 
        });

        

        return res.status(200).json({ roles })
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.addRole = async (req, res, next) => {
    try {
        const { roleName } = req.body
        const { store_id } = req.authData
        //check if role Name or store Id has a value
        if(!roleName || !store_id){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Role name And Store ID is required", 406))
        }

        const lowercaseRoleName = roleName.toLowerCase();

        //create a Role
        const role = await Roles.create({
            name:lowercaseRoleName,
            store_id:store_id
        })

        //check if creating a Role did not wrok 
        if(!role){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Role Created",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editRole = async (req, res, next) => {
    try {
        const { roleId } = req.params
        const { roleName } = req.body

        //check if type role Name or roleId dose not have a value
        if(!roleName || !roleId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Role name AND Role ID is required", 406))
        }

        const lowercaseRoleName = roleName.toLowerCase();

        //update a Role
        const role = await Roles.update({
            name:lowercaseRoleName
        },{
            where:{
                id:roleId
            }
        })


        //check if updating a Role did not wrok 
        if(role[0] === 0){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Role Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeRole = async (req, res, next) => {
    try {
        const { roleId } = req.params

        //check if roleId dose not have a value
        if(!roleId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Role ID is required", 406))
        }

        //Delete Role where Id Equal the roleId
        const role = await Roles.destroy({
            where: {
                id: roleId
            }
        });

        //check if deleting a Role did not wrok 
        if(!role){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or TypeId is not found!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Role Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}