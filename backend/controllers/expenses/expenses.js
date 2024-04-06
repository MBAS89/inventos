//Sequelize
const { Op } = require('sequelize');

//modles
const Expenses = require('../../models/expenses/expenses');
const ExpensesTypes = require('../../models/expenses/expensesType');

//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');
const { getOrderOptions } = require('../../utils/functions/orderOptions');

//middleware for handling errors
const ErrorResponse = require('../../utils/errorResponse');


exports.getExpenses = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Expenses.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { expenses_title: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : { store_id: storeId };

        const expenses = await Expenses.findAll({
            where: whereClause,
            limit: searchQuery ? undefined : parseInt(limit),
            offset: searchQuery ? undefined : (currentPage - 1) * parseInt(limit),
            include:[
                {
                    model:ExpensesTypes,
                    attributes:['type_name', 'id']
                }
            ],
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']]
        });

        

        return res.status(200).json({ totalCount, totalPages, currentPage, expenses });


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.getSingleExpense = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { expenseId } = req.query;

        if (!expenseId || !storeId) {
            return next(new ErrorResponse('Expense ID and Store ID are required', 400));
        }
        
        const expense = await Expenses.findOne({
            where: { 
                store_id: storeId,
                id: expenseId
            },
            include:[
                {
                    model:ExpensesTypes,
                    attributes:['type_name', 'id']
                }
            ],
        })

        if(!expense){
            return  next(new ErrorResponse('No Expense Found!', 404))
        }

        res.status(200).json({ expense });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.addExpense = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        //retrive Expense values from req body 
        const { expenses_title, amount, description, expenses_type_id } = req.body

        //Check if all Required Fileds are there
        const requiredFields = ['expenses_title', 'amount', 'description'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //INSERT this Supplier to the data base
        const expenses = await Expenses.create({
            store_id,
            expenses_title,
            amount,
            description,
            expenses_type_id:expenses_type_id || null
        });



        if(!expenses){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Something went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Expense Added",
            data: {
                expenses
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editExpense = async (req, res, next) => {

    try {

        //retrive expenseId from req params 
        const { expenseId } =  req.query

        //retrive Expense new values from req body 
        const { expenses_title, amount, description, expenses_type_id } = req.body

        //check if expenseId Have a value 
        if(!expenseId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Expense ID Required", 422));
        }

        //Check if all Required Fileds are there
        const requiredFields = ['expenses_title', 'amount', 'description'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const checkTitle = await Expenses.findOne({
            where: {
                expenses_title,
                id:{ [Op.ne]: expenseId }
            }
        });
    
        if(checkTitle){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("This Title is invalid. Please use a different one.", 406));
        }


        //Edit Expense in database with new values 
        const updatedExpense = await Expenses.update(
            {
                expenses_title,
                amount,
                description,
                expenses_type_id,
            },
            {
                returning: true,
                where: { id: expenseId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedExpense){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Expense Edited",
            data: {
                expenses:updatedExpense
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeExpense = async (req, res, next) => {

    try {
        const { expenseId } = req.query

        //check if there is a expense with this Id
        const expense = await Expenses.findOne({
            where:{
                id:expenseId
            },
            attribute:['id']
        })

        if(expense){
            //DELETE Expense FROM DATA BASE WITH THE DISRE ID VALUE
            const expense = await Expenses.destroy({
                where: {
                    id:expenseId,
                }
            });

            if(!expense){
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

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}