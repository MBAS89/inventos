//Sequelize operators
const { Op } = require('sequelize');

//modles
const Payment = require("../../models/employees/payments");

//reusbale funtion
const { getOrderOptions } = require("../../utils/functions/orderOptions");
const ErrorResponse = require("../../utils/errorResponse");
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');


exports.readEmployeePayments = async (req, res, next) => {
    try {
        const { employeeId, status, page, limit = 4, sort, column } = req.query;

        if (!page || !employeeId) {
            return next(new ErrorResponse('Page Number and Employee ID are required', 400));
        }
        
        const whereClause = {
            employeeId: employeeId,
        };

        // Add status to the where clause only if it is defined and exclude "due" status
        if (status !== undefined) {
            whereClause.status = status;
        }else{
            whereClause.status = {
                [Op.ne]: "due", // Exclude "due" status
            };
        }


        const totalCount = await Payment.count({ where: whereClause });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const payments = await Payment.findAll({
            where:whereClause,
            limit:parseInt(limit),
            offset:(currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']]
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, payments });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readEmployeePayment = async (req, res, next) => {
    try {
        const { paymentId } = req.query

        if (!paymentId) {
            return next(new ErrorResponse('Payment ID are required', 400));
        }


        const payment = await Payment.findOne({
            where:{
                id:paymentId
            }
        });

        if(!payment){
            return  next(new ErrorResponse('No Payment Found!', 404))
        }

        return res.status(200).json({ payment });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)        
    }
}

exports.createEmployeePayment = async (req, res, next) => {
    try {
        const { employeeId, amount, status, paidDate, paymentDate, hoursWorked } = req.body

        //Check if all Required Fileds are there
        const requiredFields = ['employeeId', 'amount', 'paymentDate'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //INSERT this Payment to the data base
        const payment = await Payment.create({
            employeeId,
            amount,
            status,
            paidDate,
            paymentDate,
            hoursWorked
        });

        //if creating an Payment did not work 
        if(!payment){

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Something went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Payment Added",
            results:1,
            data: {
                payment
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.payOrCancelPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.query;

        //if there is no payment id
        if(!paymentId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("payment ID required", 406));
        }

        const { paid } = req.body
        
        //Edit this Payment in the data base
        const updatedPayment = await Payment.update(
            {
                status:paid ? 'paid' : 'canceled',
                paidDate:new Date()
            },
            {
                returning: false,
                where: { id: paymentId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedPayment[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Payment Status Edited",
            data: {
                payment:updatedPayment
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.query;

        //check if paymentId Have a value 
        if(!paymentId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Payment ID Required", 422));
        }

        const { amount, status, paymentDate, paidDate, hoursWorked } = req.body;

        //Check if all Required Fileds are there
        const requiredFields = ['amount', 'status', 'paymentDate'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //Edit Payment in database with new values 
        const updatedPayment = await Payment.update(
            {
                amount,
                status,
                paymentDate, 
                paidDate:paidDate ? paidDate : null,
                hoursWorked: hoursWorked ? hoursWorked : null
            },
            {
                returning: false,
                where: { id: paymentId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedPayment[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Payemnt Edited",
            data: {
                payment:updatedPayment
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.deletePayment = async (req, res, next) => {
    try {
        //retrive paymentID from req params 
        const { paymentId } =  req.query

        //check if paymentId have value if not throw an error
        if(!paymentId){
            return next(new ErrorResponse("Payment ID Is required", 422));
        }

        //DELETE Payment FROM DATA BASE WITH THE DISRE ID VALUE
        const payment = await Payment.destroy({
            where: {
                id: paymentId
            }
        });

        if(!payment){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Payment Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)      
    }
}