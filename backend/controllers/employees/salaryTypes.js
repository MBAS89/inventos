const SalaryTypes = require("../../models/employees/salarytypes")
const ErrorResponse = require("../../utils/errorResponse")

exports.readSalaryTypes = async (req, res, next) => {
    try {
        
        //fetch all Salary types
        const salaryTypes = await SalaryTypes.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{ all: true, nested: true }]
        })

        //return success response with message
        res.status(201).json({
            salaryTypes
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.addSalaryTypes = async (req, res, next) => {
    try {
        const { typeName } = req.body

        //check if type name has a value
        if(!typeName){
            //if it dose not have a value send a responese with this error message 
            return next(new ErrorResponse("Type name is required", 406))
        }

        //create a Salary type
        const salaryType = await SalaryTypes.create({
            type:typeName
        })

        //check if creating a salary type did not wrok 
        if(!salaryType){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Salary Type Created",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editSalaryTypes = async (req, res, next) => {
    try {
        const { typeId } = req.params
        const { typeName } = req.body

        //check if type name or typeId dose not have a value
        if(!typeName || !typeId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Type name AND Type ID is required", 406))
        }

        //update a Salary type
        const salaryType = await SalaryTypes.update({
            type:typeName
        },{
            where:{
                id:typeId
            }
        })


        //check if updating a salary type did not wrok 
        if(salaryType[0] === 0){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Salary Type Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeSalaryTypes = async (req, res, next) => {
    try {
        const { typeId } = req.params

        //check if typeId dose not have a value
        if(!typeId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Type ID is required", 406))
        }


        //Delete SAlary Type where Id Equal the type ID
        const salaryType = await SalaryTypes.destroy({
            where: {
                id: typeId
            }
        });

        //check if deleting a salary type did not wrok 
        if(!salaryType){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or TypeId is not found!", 500))
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Salary Type Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}