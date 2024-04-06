//error response middleware
const ErrorResponse = require('../../utils/errorResponse');

//modles
const ExpensesTypes = require('../../models/expenses/expensesType');

exports.readExpensesTypes = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        //Fetch All Expenses type
        const expensesTypes = await ExpensesTypes.findAll({
            where:{ store_id },
            order: [['id', 'ASC']] 
        })

        //if response with an error
        if(!expensesTypes){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(200).json({expensesTypes})

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addExpenseType = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        //retrieve values from req.body 
        const { type_name } = req.body

        //create Supplier type
        const expensesType = await ExpensesTypes.create({
            store_id,
            type_name
        })

        //if creating response with an error
        if(!expensesType){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Expense Type Created",
            data: {
                expensesType
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editExpenseType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.query

        //retrieve new values from req.body 
        const { type_name } = req.body

        //update Expense type with the new values 
        const expensesType = await ExpensesTypes.update(
            {
                type_name
            },
            { 
                where: { id: typeId },
                returning: true
            }
        );

        //if updating response with an error
        if(!expensesType){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Expense Type Updated"
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeExpenseType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.query

        const expensesType = await ExpensesTypes.findOne({
            where:{
                id:typeId
            },
            attribute:['id']
        })

        if(expensesType){
            //DELETE Expense FROM DATA BASE WITH THE DISRE ID VALUE
            const expensesType = await ExpensesTypes.destroy({
                where: {
                    id:typeId,
                }
            });

            if(!expensesType){
                return next(new ErrorResponse("Something went wrong!", 500));
            }

            //return success response with message
            res.status(200).json({
                status:"success",
                message:"Expense Deleted",
            })

        }else{
            return next(new ErrorResponse("There Is No Expense With This ID ", 404));
        }

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Expense Type Deleted"
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}