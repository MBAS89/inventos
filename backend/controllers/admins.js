//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//error handler
const ErrorResponse = require('../utils/errorResponse');

//modles
const Admins = require('../models/sotres/admins');

//cahe libray
const NodeCache = require("node-cache");
const cache = new NodeCache();

const { generateAdminToken } = require('../utils/generateAdminToken');


exports.addAdmin = async (req, res, next) => {

    try {

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
        //retrive admin id
        const { adminId } = req.query

        //retrive all values from req body 
        const { first_name, last_name, email, password, phone_number } = req.body

        if(password){
            //hash password before insert into database
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedAdmin = await Admins.update(
                { 
                    first_name,
                    last_name,
                    email,
                    password:hashedPassword,
                    phone_number
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
                    phone_number
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