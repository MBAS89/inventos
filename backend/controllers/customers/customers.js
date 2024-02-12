const { Op } = require('sequelize');

//modles
const Customers = require('../../models/cutomers/cutomers');
const CustomersTypes = require('../../models/cutomers/customersTypes');

//pcakgae to validate email
const validator = require('validator');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../../utils/functions/cloudinary/cloudinaryUtils');
//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');

// a middle ware to handle errors
const ErrorResponse = require('../../utils/errorResponse');
const { Invoices } = require('../../models/sales/invoices');
const { getOrderOptions } = require('../../utils/functions/orderOptions');

exports.getCustomers = async (req, res, next) => {
    try {
        const { page, limit = 10, storeId, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Customers.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { full_name: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.like]: `%${searchQuery}%` } },
                { address: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
            ]
        } : { store_id: storeId };

        const customers = await Customers.findAll({
            where: whereClause,
            limit: searchQuery ? undefined : parseInt(limit),
            offset: searchQuery ? undefined : (currentPage - 1) * parseInt(limit),
            include: [{
                model: CustomersTypes,
                as: 'customerType',
                attributes: ['type_name', 'id']
            }],
            order:column && sort ? getOrderOptions(column, sort) : []
        });
        return res.status(200).json({ totalCount, totalPages, currentPage, customers });


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.getSingleCustomer = async (req, res, next) => {
    try {
        const { storeId, customerId } = req.query;

        if (!customerId || !storeId) {
            return next(new ErrorResponse('Customer ID and Store ID are required', 400));
        }
        
        const customer = await Customers.findOne({
            where: { 
                store_id: storeId,
                id: customerId
            },
            include: [{ 
                model: CustomersTypes, 
                as: 'customerType',
                attributes:['type_name', 'id', 'discount_value']
            }]
        })

        if(!customer){
            return  next(new ErrorResponse('No Customer Found!', 404))
        }

        const invoices = await Invoices.findAll({
            where:{
                store_id: storeId,
                customerId:customer.id
            }
        })

        /*
        const totalCount = await Customers.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);
    
        const customers = await Customers.findAll({
            where: { store_id: storeId },
            limit: parseInt(limit),
            offset: (currentPage - 1) * parseInt(limit),
            include: [{ 
                model: CustomersTypes, 
                as: 'customerType',
                attributes:['type_name', 'id']
            }]
        });*/
    
        res.status(200).json({ customer, invoices });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addCustomer = async (req, res, next) => {

    try {
        //retrive Customer values from req body 
        const { store_id, full_name, email, phone_number, address, cutomer_type } = req.body

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Check if all Required Fileds are there
        const requiredFields = ['store_id', 'full_name', 'email', 'phone_number', 'address', 'cutomer_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        // Check if the email is valid
        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) {
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        //INSERT this Product to the data base and set || null for the optianl fileds 
        const customer = await Customers.create({
            store_id,
            full_name,
            image: imageUrl,
            image_id: imageId,
            email,
            phone_number,
            address,
            cutomer_type
        });

        if(!customer){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Something went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Cutomer Added",
            results:1,
            data: {
                customer
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editCustomer = async (req, res, next) => {

    try {

        //retrive customerId from req params 
        const { customerId } =  req.params

        console.log(customerId)
        //retrive Customer new values from req body 
        const { full_name, email, phone_number, address, cutomer_type, oldImage, total_transactions, total_debt, total_paid } = req.body

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }



        //check if customerId Have a value 
        if(!customerId){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Customer ID Required", 422));
        }

        //fetch the old image id For Customer 
        const customer = await Customers.findOne({
            where: {
                id: customerId
            },
            attributes: ['image_id']
        });



        // If the Customer exists, extract the image ID
        const oldCustomerImageId = customer ? customer.image_id : null;

        //Check if all Required Fileds are there
        const requiredFields = ['full_name', 'email', 'phone_number', 'address', 'cutomer_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
        if (!isValidEmail) {
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }


        //Edit Customer in database with new values 
        const updatedCustomer = await Customers.update(
            {
                full_name,
                image: imageUrl ? imageUrl : oldImage,
                image_id: imageId,
                email,
                phone_number,
                address,
                cutomer_type,
                total_transactions:total_transactions ? total_transactions : customer.total_transactions,
                total_debt: total_debt ? total_debt : customer.total_debt,
                total_paid: total_paid ? total_paid : customer.total_paid,

            },
            {
                returning: true,
                where: { id: customerId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedCustomer){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldCustomerImageId)
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Customer Edited",
            cloudinary:result || 'no new Image',
            results:1,
            data: {
                customer:updatedCustomer
            }
        })


    } catch (error) {
        console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeCustomer = async (req, res, next) => {

    try {
        //retrive customerId from req params 
        const { customerId } =  req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //check if customerId have value if not throw an error
        if(!customerId){
            return next(new ErrorResponse("Customer ID Is required", 422));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)


        //DELETE Customer FROM DATA BASE WITH THE DISRE ID VALUE
        await Customers.destroy({
            where: {
                id: customerId
            }
        });

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Customer Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}