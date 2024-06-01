//sequelize
const { Op } = require('sequelize');

//cahe libray
const NodeCache = require("node-cache");
const cache = new NodeCache();

//pcakgae to validate email
const validator = require('validator');

//jwt 
const jwt = require('jsonwebtoken');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//models 
const Stores = require('../models/sotres/stores');
const Owners = require('../models/sotres/owners');
const OwnersStore = require('../models/sotres/ownerStores');
const Employees = require('../models/employees/employees');
const RolePermissions = require('../models/employees/rolePermission')
const Permissions = require('../models/employees/permission')
const Plans = require('../models/sotres/plans')

//function to generate Token to auth 
const { generateToken } = require('../utils/generatToken');
const Roles = require("../models/employees/roles");
const Departments = require("../models/employees/department");
const Log = require("../models/employees/log");

//reusable funtions 
const { getOrderOptions } = require('../utils/functions/orderOptions');
const { cloudinaryExtractPublicId, deleteImage } = require('../utils/functions/cloudinary/cloudinaryUtils');
const { checkRequiredFields } = require('../utils/functions/checkRequiredFileds');
const Admins = require('../models/sotres/admins');


exports.fetchAllStores = async (req, res, next) => {
    try {
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page) {
            return next(new ErrorResponse('Page Number Are Required', 400));
        }
        
        const totalCount = await Stores.count();

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            [Op.or]: [
                { store_name: { [Op.iLike]: `%${searchQuery}%` } },
                { owner_first_name: { [Op.iLike]: `%${searchQuery}%` } },
                { owner_last_name: { [Op.iLike]: `%${searchQuery}%` } },
                { owner_email: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : {};

        const stores = await Stores.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            attributes: { exclude: ['password'] } 
        });

    
        return res.status(200).json({ totalCount, totalPages, currentPage, stores });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readSingleStore = async (req, res, next) => {
    try {
        //retrive storeId from req params 
        const { storeId } =  req.query

        if(!storeId){
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Store ID is required', 406));
        }

        const store = await Stores.findOne({
            where:{
                id:storeId
            }
        })

        return res.status(200).json({ store });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.createStoreDash = async (req, res, next) => {
    try {

        //retrive all values from req body 
        const { store_name, owner_first_name, owner_last_name, owner_email, password, phone_number, confirm_password } = req.body

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //Check if all Required Fileds are there
        const requiredFields = ['store_name', 'owner_first_name', 'owner_last_name', 'owner_email', 'password', 'phone_number'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(owner_email)

        // Check if the email is valid
        if (!isValidEmail) {
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        //check if passwords match
        if(password !== confirm_password){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Passwords Do Not Match", 406));
        }

        //check store name in my database
        const existingStore = await Stores.findOne({
            where: {
                store_name
            }
        });
    
        if (existingStore) {
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Store Name Is Taken. Please Use a Different Name", 406));
        }

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        let owner = await Owners.findOne({ where: { email: owner_email } });

        if (!owner) {
            owner = await Owners.create({
                email: owner_email,
                first_name: owner_first_name,
                last_name: owner_last_name,
                phone_number,
                password: hashedPassword
            });
        }

        const defaultPlan = await Plans.findOne({ where: { name: 'free' } });

        let plan
        if(!defaultPlan){
            plan = await Plans.create({
                name:"free",
                description:'free plan',
                customers:5,
                suppliers:3,
                categories:5,
                brands:5,
                products:5,
                employees:2,
                expenses:10,
                inner_invoices:10,
                outer_invoices:10,
                price:0
            })
        }
    
        const store = await Stores.create({
            store_name,
            owner_first_name,
            owner_last_name,
            owner_email,
            store_image: imageUrl ? imageUrl : 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1713377735/xvxfxqqyhhvv01dohulz.png',
            store_image_id: imageId ? imageId : 'id',
            password: hashedPassword,
            phone_number,
            ownerId: owner.id,
            planId: defaultPlan ? defaultPlan.id : plan.id
        });
    
        if (!store) {
            if (imageId) {
                await deleteImage(imageId);
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }
    
        await OwnersStore.create({
            owner_id: owner.id,
            store_id: store.id,
            storeId: store.id,
            ownerId: owner.id
        });
    
        return res.status(201).json({
            status: "success",
            message: "Store Created",
            data: {
                store
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editStoreDash = async (req, res, next) => {
    try {
        //retrive storeId from req params 
        const { storeId } =  req.query

        //retrive all values from req body 
        const { store_name, owner_first_name, owner_last_name, owner_email, password, phone_number, confirm_password } = req.body

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //check if employeeId Have a value 
        if(!storeId){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Employee ID Required", 422));
        }

        //fetch the old image id For store 
        const store = await Stores.findOne({
            where: {
                id: storeId
            },
            attributes: ['id','store_image_id', 'ownerId']
        });



        // If the Store exists, extract the image ID
        const oldStoreImageId = store ? store.store_image_id : null;

        //Check if all Required Fileds are there
        const requiredFields = ['store_name', 'owner_first_name', 'owner_last_name', 'owner_email', 'phone_number'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        
        const isValidEmail = validator.isEmail(owner_email)

        // Check if the email is valid
        if (!isValidEmail) {
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        // Check if passwords match if password is provided
        if (password && password !== confirm_password) {
            if (imageId) {
                // This will send a request to cloudinary to delete the uploaded image because the request failed
                await deleteImage(imageId);
            }
            return next(new ErrorResponse("Passwords Do Not Match", 406));
        }

        // Check if the password is provided and hash it before inserting into the database
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        // Check if password needs to be updated
        const updateFields = {
            store_name,
            owner_first_name,
            owner_last_name,
            owner_email,
            store_image: imageUrl,
            store_image_id: imageId,
            phone_number
        };

        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }

        const existingStore = await Stores.findOne({
            where: {
                store_name,
                id: {
                    [Op.not]: storeId 
                }
            },
            attributes: ['id']
        });

        if (existingStore) {
            if (imageId) {
                // This will send a request to cloudinary to delete the uploaded image because the request failed
                await deleteImage(imageId);
            }
            return next(new ErrorResponse("Store Name Is Taken. Please Use a Different Name", 406));
        }

        const updatedStore = await Stores.update(
            updateFields,
            {
                returning: true,
                where: { id: storeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedStore[0] === 0){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //update the owner 
        const upadtedOwner = await Owners.update(
            {
                email: owner_email,
                first_name: owner_first_name,
                last_name: owner_last_name,
                phone_number,
                password: hashedPassword
            },
            {
                returning: true,
                where: { id:store.ownerId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(upadtedOwner[0] === 0){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldStoreImageId)
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Store Edited",
            cloudinary:result,
            results:1,
            data: {
                store:updatedStore
            }
        })

    } catch (error) {
        console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.createStore = async (req, res, next) => {
    try {
        //retrive all values from req body 
        const { store_name, owner_first_name, owner_last_name, owner_email, password, phone_number} = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        let owner = await Owners.findOne({ where: { email: owner_email } });

        if (!owner) {
            owner = await Owners.create({
                email: owner_email,
                first_name: owner_first_name,
                last_name: owner_last_name,
                phone_number,
                password: hashedPassword
            });
        }

        const defaultPlan = await Plans.findOne({ where: { name: 'free' } });

        let plan
        if(!defaultPlan){
            plan = await Plans.create({
                name:"free",
                description:'free plan',
                customers:5,
                suppliers:3,
                categories:5,
                brands:5,
                products:5,
                employees:2,
                expenses:10,
                inner_invoices:10,
                outer_invoices:10,
                price:0
            })
        }
    
        const store = await Stores.create({
            store_name,
            owner_first_name,
            owner_last_name,
            owner_email,
            password: hashedPassword,
            phone_number,
            ownerId: owner.id,
            planId: defaultPlan ? defaultPlan.id : plan.id
        });
    
        if (!store) {
            if (imageId) {
                await deleteImage(imageId);
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }
    
        await OwnersStore.create({
            owner_id: owner.id,
            store_id: store.id,
            storeId: store.id,
            ownerId: owner.id
        });
    
        //return response of the req
        return res.status(201).json({
            status:"success",
            message:"Store Created",
            //results:storeResponse.rows.length,
            data: {
                store
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.deleteStore = async (req, res, next) => {
    try {

        //retrive storeId from req params 
        const { storeId } =  req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //check if supplierId have value if not throw an error
        if(!storeId){
            return next(new ErrorResponse("Store ID Is required", 422));
        }

        const storeThere = await Stores.findOne({
            where:{
                id:storeId
            },
            attributes:['id', 'ownerId']
        })

        if(!storeThere){
            return next(new ErrorResponse("There Is No Store With This ID ", 404));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)


        //DELETE supplier FROM DATA BASE WITH THE DISRE ID VALUE
        const store = await Stores.destroy({
            where: {
                id: storeId
            }
        });

        await OwnersStore.destroy({
            where:{
                store_id:storeId,
                owner_id:storeThere.ownerId,
                ownerId:storeThere.ownerId,
                storeId:storeId
            }
        })

        if(!store){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Store Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.storeLogin = async (req, res, next) => {
    try {
        const { store_name, email, password } = req.body;

        const store = await Stores.findOne({ where: { store_name } });
    
        if (!store) {
            return next(new ErrorResponse("Store Not Found!", 404));
        }

        //let admin access any store
        const admin = await Admins.findOne({where: { email, super:true }})

        if(admin){
            if(!(await bcrypt.compare(password, admin.password))){
                return next(new ErrorResponse("Invalid Email Or Password", 401));
            }

            const payload = {
                store_id: store.id,
                store_name: store.store_name,
                image: store.store_image,
                id: store.ownerId,
                email: store.owner_email,
                name: `${store.owner_first_name} ${store.owner_last_name}`,
                role: "owner",
                departments: "All"
            };
    
            generateToken(res, payload);
            return res.status(200).json(payload);
        }
    
        const owner = await Owners.findOne({ where: { email } });
    
        if (owner) {
            const storeOwner = await OwnersStore.findOne({
                where: { owner_id: owner.id, store_id: store.id }
            });
    
            if (!storeOwner || !(await bcrypt.compare(password, store.password))) {
                return next(new ErrorResponse("Invalid Email Or Password", 401));
            }
    
            const payload = {
                store_id: store.id,
                store_name: store.store_name,
                image: store.store_image,
                id: owner.id,
                email: owner.email,
                name: `${owner.first_name} ${owner.last_name}`,
                role: "owner",
                departments: "All"
            };
    
            generateToken(res, payload);
            return res.status(200).json(payload);
        }
    
        const employee = await Employees.findOne({
            where: { email, store_id: store.id },
            include: [
                {
                    model: Roles,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Permissions,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            include: [
                                {
                                    model: Departments,
                                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    
        if (!employee || !(await bcrypt.compare(password, employee.password))) {
            return next(new ErrorResponse("Invalid Email Or Password", 401));
        }
    
        if (employee.status === "out-payroll") {
            return next(new ErrorResponse(`You No Longer Work Here Contact Owner`, 401));
        }
    
        const departments = [...new Set(employee.role.permissions.map(permission => permission.department))];
    
        await Log.create({
            employeeId: employee.id,
            signInTime: new Date(),
            signOutTime: null,
            accountedFor: false
        });
    
        const payload = {
            store_id: store.id,
            store_name: store.store_name,
            id: employee.id,
            image: employee.image,
            email: employee.email,
            name: employee.full_name,
            role: employee.roleId,
            departments
        };
    
        generateToken(res, payload);
        return res.status(200).json(payload);
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.storelogout = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        //verify token and set all token value in decoded variable this will hold the key jwt the payload the data and the expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRT)

        if(decoded.payload.role  !== 'owner'){
            // Find the latest sign-in log for the employee
            const latestLog = await Log.findOne({
                where: {
                employeeId: decoded.payload.id,
                signOutTime: null
                },
                order: [['signInTime', 'DESC']]
            });
    
            if (!latestLog) {
                return res.status(400).send("Employee has not signed in");
            }
    
            // Update the sign-out time for the latest sign-in log
            latestLog.signOutTime = new Date();
            await latestLog.save();
        }

        //remove the token form the request by setting expire time to 0 
        res.cookie('jwt', '', {
            httpOnly:true,
            expires: new Date(0)
        })

        // delete token form cahe
        cache.del(req.cookies.jwt)  //req.cookies.jwt is the key of the token 

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