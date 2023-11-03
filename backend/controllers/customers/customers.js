//modles
const Customers = require('../../models/cutomers/cutomers');

//pcakgae to validate email
const validator = require('validator');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../../utils/functions/cloudinary/cloudinaryUtils');
//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');

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
        if (!isValidEmail(email)) {
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
        //retrive Customer new values from req body 
        const { full_name, email, phone_number, address, cutomer_type } = req.body

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //check if customerId Have a value 
        if(!customerId){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

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
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        // Check if the email is valid
        if (!isValidEmail(email)) {
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }


        //Edit Customer in database with new values 
        const updatedCustomer = await Customers.update(
            {
                full_name,
                image: imageUrl,
                image_id: imageId,
                email,
                phone_number,
                address,
                cutomer_type
            },
            {
                returning: true,
                where: { id: customerId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedCustomer){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldCustomerImageId)


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Customer Edited",
            cloudinary:result,
            results:1,
            data: {
                customer:updatedCustomer
            }
        })


    } catch (error) {
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