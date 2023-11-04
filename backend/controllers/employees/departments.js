//error response middleware
const ErrorResponse = require('../../utils/errorResponse')

//modles
const Departments = require('../../models/employees/department')

exports.addDepartment = async (req, res, next) => {
    try {
        const { departmentName } = req.body

        //check if Department Name has a value
        if(!departmentName){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Department name is required", 406))
        }

        const lowercaseDepartmentName = departmentName.toLowerCase();

        //create a Department
        const department = await Departments.create({
            name:lowercaseDepartmentName
        })

        //check if creating a department did not wrok 
        if(!department){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Department Created",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params
        const { departmentName } = req.body

        //check if type Department Name or roleId dose not have a value
        if(!departmentName){
            //if not send an error with this response message 
            return next(new ErrorResponse("Department name is required", 406))
        }

        const lowercaseDepartmentName = departmentName.toLowerCase();

        //update a Department
        const department = await Departments.update({
            name:lowercaseDepartmentName
        },{
            where:{
                id:departmentId
            }
        })


        //check if updating a Department did not wrok 
        if(department[0] === 0){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Department Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params

        //check if departmentId dose not have a value
        if(!departmentId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Department ID is required", 406))
        }

        //Delete Department where Id Equal the roleId
        const department = await Departments.destroy({
            where: {
                id: departmentId
            }
        });

        //check if deleting a Department did not wrok 
        if(!department){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or TypeId is not found!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Department Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}