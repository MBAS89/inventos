const { Sequelize } = require("sequelize");
const { Op } = require('sequelize');

//jwt 
const jwt = require('jsonwebtoken');

//Modles
const Admins = require('../models/sotres/admins');
const { checkRequiredFields } = require('../utils/functions/checkRequiredFileds');
const Plans = require('../models/sotres/plans');
const ErrorResponse = require('../utils/errorResponse');



exports.fetchAllPlans = async (req, res, next) => {
    try {
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error) 
    }
}

exports.fetchSinglePlans = async (req, res, next) => {
    try {
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error) 
    }
}

exports.createPlan = async (req, res, next) => {
    try {
        const token = req.cookies.admin

        if(!token){
            return next(new ErrorResponse("Unauthorized Access: Invalid Token", 401)); 
        }

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRT)

        const isSuper = await Admins.findOne({
            where:{
                id:decoded.payload.id,
                super:true
            }
        })


        if(!isSuper){
            return next(new ErrorResponse("Unauthorized To Do These Types Of Actions", 401)); 
        }

        const { 
            name, description, customers, suppliers, categories, brands, 
            products, employees, expenses, inner_invoices, outer_invoices, price, on_sale, sale_price 
        } = req.body

        //Check if all Required Fileds are there
        const requiredFields = [
            'name', 'description', 'customers', 'suppliers', 'categories', 'brands', 
            'products', 'employees', 'expenses', 'inner_invoices', 'outer_invoices', 'price'
        ];

        const validationError = checkRequiredFields(next, req.body, requiredFields);


        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        const planThere = await Plans.findOne({
            where:{
                name:name
            }
        })

        
        if(planThere){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse('Plan is Already there', 406));
        }

        const plan = await Plans.create({
            name,
            description,
            customers,
            suppliers,
            categories,
            brands,
            products,
            employees,
            expenses,
            inner_invoices,
            outer_invoices,
            price,
            on_sale:on_sale ? on_sale : false,
            sale_price:sale_price ? sale_price : 0
        })


        //return success response with message
        res.status(201).json({
            status: "success",
            message: "Plan Added",
            data: {
                plan
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error) 
    }
}

exports.editPlan = async (req, res, next) => {
    try {

        const token = req.cookies.admin

        if(!token){
            return next(new ErrorResponse("Unauthorized Access: Invalid Token", 401)); 
        }

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRT)

        const isSuper = await Admins.findOne({
            where:{
                id:decoded.payload.id,
                super:true
            }
        })


        if(!isSuper){
            return next(new ErrorResponse("Unauthorized To Do These Types Of Actions", 401)); 
        }

        
        const { planId } = req.query

        const { 
            name, description, customers, suppliers, categories, brands, 
            products, employees, expenses, inner_invoices, outer_invoices, price, on_sale, sale_price 
        } = req.body
    
        //Check if all Required Fileds are there
        const requiredFields = [
            'name', 'description', 'customers', 'suppliers', 'categories', 'brands', 
            'products', 'employees', 'expenses', 'inner_invoices', 'outer_invoices', 'price'
        ];

        const validationError = checkRequiredFields(next, req.body, requiredFields);

    
        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }
    
        const checkPlan = await Coupon.findOne({
            where: {
                name: name,
                id: { [Sequelize.Op.ne]: planId } 
            }
        });
    
        if(checkPlan){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("This Plan Name is invalid. Please use a different one.", 406));
        }
        
        const updatedPlan = await Plans.update(
            { 
                name,
                description,
                customers,
                suppliers,
                categories,
                brands,
                products,
                employees,
                expenses,
                inner_invoices,
                outer_invoices,
                price,
                on_sale:on_sale ? on_sale : false,
                sale_price:sale_price ? sale_price : 0
            },
            { returning: true, where: { id: planId } }
        );
    
        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedPlan){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }
    
        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Plan Updated",
            data: {
                plan:updatedPlan
            }
        })
    
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removePlan = async (req, res, next) => {
    try {

        const token = req.cookies.admin

        if(!token){
            return next(new ErrorResponse("Unauthorized Access: Invalid Token", 401)); 
        }

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRT)

        const isSuper = await Admins.findOne({
            where:{
                id:decoded.payload.id,
                super:true
            }
        })


        if(!isSuper){
            return next(new ErrorResponse("Unauthorized To Do These Types Of Actions", 401)); 
        }


        const { planId } = req.query

        //check if there is a Plan with this Id

        const palan = await Plans.findOne({
            where:{
                id:planId
            },
            attribute:['id']
        })

        if(palan){
            //DELETE Plan FROM DATA BASE WITH THE DISRE ID VALUE
            const paln = await Plans.destroy({
                where: {
                    id:planId,
                }
            });

            if(!paln){
                return next(new ErrorResponse("Something went wrong!", 500));
            }

            //return success response with message
            res.status(200).json({
                status:"success",
                message:"Paln Deleted",
            })

        }else{
            return next(new ErrorResponse("There Is No Plan With This ID ", 404));
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}