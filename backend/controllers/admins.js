const { Op } = require('sequelize');

//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//error handler
const ErrorResponse = require('../utils/errorResponse');

//jwt 
const jwt = require('jsonwebtoken');

//modles
const Admins = require('../models/sotres/admins');

//cahe libray
const NodeCache = require("node-cache");
const cache = new NodeCache();

const { generateAdminToken } = require('../utils/generateAdminToken');
const { getOrderOptions } = require('../utils/functions/orderOptions');

exports.fetchAllAdmins = async (req, res, next) => {
    try {
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page) {
            return next(new ErrorResponse('Page Number Is Required', 400));
        }
        
        const totalCount = await Admins.count();

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            [Op.or]: [
                { first_name: { [Op.iLike]: `%${searchQuery}%` } },
                { last_name: { [Op.iLike]: `%${searchQuery}%` } },
                { email: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : {};

        const admins = await Admins.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            attributes: { exclude: ['password'] },
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, admins });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readSingleAdmin = async (req, res, next) => {
    try {
        //retrive adminId from req params 
        const { adminId } =  req.query

        if(!adminId){
            //If there is no Id 
            return next(new ErrorResponse('Admin ID is required', 406));
        }

        const admin = await Admins.findOne({
            where:{
                id:adminId
            }
        })

        if(!admin){
            //If there is no Admin found 
            return next(new ErrorResponse('Admin With This ID is Not Found!', 404));
        }

        return res.status(200).json({ admin });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addAdmin = async (req, res, next) => {

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

        //retrive all values from req body 
        const { first_name, last_name, email, password, phone_number } = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert the admin to database in the store that he belong to
        const admin = await Admins.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone_number
        });

        //if the adding did not work throw an error
        if (!admin) {
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return response of the req
        res.status(201).json({
            status: "success",
            message: "Admin Added",
            data: {
                admin
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeAdmin = async (req, res, next) => {

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


        //retrive all values from req body 
        const { adminId } = req.query

        //check if all fileds are there
        if(!adminId){
            return next(new ErrorResponse("A Admin ID Is Required", 406))
        }

        const admin = await Admins.findOne({
            where:{
                id:adminId
            }
        })

        if(!admin){
            return next(new ErrorResponse('Admin Not Found', 404))
        }

        //delete admin from admins table 
        await Admins.destroy({
            where: {
                id:adminId
            }
        });


        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Admin Removed"
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editAdmin = async (req, res, next) => {
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

        //retrive admin id
        const { adminId } = req.query

        //retrive all values from req body 
        const { first_name, last_name, email, password, phone_number, superAdmin } = req.body

        if(password){
            //hash password before insert into database
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedAdmin = await Admins.update(
                { 
                    first_name,
                    last_name,
                    email,
                    password:hashedPassword,
                    phone_number,
                    super:superAdmin
                },
                { returning: true, where: { id: adminId } }
            );

            //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
            if(!updatedAdmin){
                return next(new ErrorResponse("Something Went Wrong", 500));
            }
        
            //return success response with message
            return res.status(201).json({
                status:"success",
                message:"Admin Updated",
                data: {
                    coupon:updatedAdmin
                }
            })

        }else{
            const updatedAdmin = await Admins.update(
                { 
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    super:superAdmin
                },
                { returning: true, where: { id: adminId } }
            );

            //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
            if(!updatedAdmin){
                return next(new ErrorResponse("Something Went Wrong", 500));
            }
        
            //return success response with message
            return res.status(201).json({
                status:"success",
                message:"Admin Updated",
                data: {
                    coupon:updatedAdmin
                }
            })
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return next(new ErrorResponse("All Fields Are Required", 422));
        }

        const admin = await Admins.findOne({ where: { email } });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return next(new ErrorResponse("Invalid Email Or Password", 401));
        }

        const payload = {
            first_name: admin.first_name,
            last_name: admin.last_name,
            id: admin.id,
            email: admin.email,
            phone_number: admin.phone_number,
            role: "admin",
            departments: "All"
        };

        generateAdminToken(res, payload);
        return res.status(200).json(payload);

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.logoutAdmin = async (req, res, next) => {
    try {
        //remove the token form the request by setting expire time to 0 
        res.cookie('admin', '', {
            httpOnly:true,
            expires: new Date(0)
        })

        // delete token form cahe
        cache.del(req.cookies.admin)  //req.cookies.jwt is the key of the token 

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Logout Successful",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}