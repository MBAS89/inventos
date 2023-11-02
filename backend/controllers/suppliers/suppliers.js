//modles
const Suppliers = require('../../models/suppliers/suppliers');

//pcakgae to validate email
const validator = require('validator');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../../utils/functions/cloudinary/cloudinaryUtils');
//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');


exports.addSupplier = async (req, res, next) => {

    try {
        //retrive Customer values from req body 
        const { store_id, supplier_name, email, phone_number, address, supplier_type } = req.body

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Check if all Required Fileds are there
        const requiredFields = ['store_id', 'supplier_name', 'email', 'phone_number', 'address', 'supplier_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
        if (!isValidEmail) {
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        //INSERT this Supplier to the data base
        const supplier = await Suppliers.create({
            store_id,
            supplier_name,
            image: imageUrl,
            image_id: imageId,
            email,
            phone_number,
            address,
            supplier_type
        });



        if(!supplier){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Something went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Supplier Added",
            results:1,
            data: {
                supplier
            }
        })

    } catch (error) {
        console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editSupplier = async (req, res, next) => {

    try {

        //retrive supplierId from req params 
        const { supplierId } =  req.params
        //retrive supplier new values from req body 
        const { supplier_name, email, phone_number, address, supplier_type } = req.body

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //check if supplierId Have a value 
        if(!supplierId){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Supplier ID Required", 422));
        }

        //fetch the old image id For Supplier 
        const supplier = await Suppliers.findOne({
            where: {
                id: supplierId
            },
            attributes: ['image_id']
        });

        // If the supplier exists, extract the image ID
        const oldSupplierImageId = supplier ? supplier.image_id : null;

        //Check if all Required Fileds are there
        const requiredFields = ['supplier_name', 'email', 'phone_number', 'address', 'supplier_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
        if (!isValidEmail) {
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }


        //Edit Supplier in database with new values 
        const updatedSupplier = await Suppliers.update(
            {
                supplier_name,
                image: imageUrl,
                image_id: imageId,
                email,
                phone_number,
                address,
                supplier_type
            },
            {
                returning: true,
                where: { id: supplierId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedSupplier){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldSupplierImageId)


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Supplier Edited",
            cloudinary:result,
            results:1,
            data: {
                supplier:updatedSupplier
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeSupplier = async (req, res, next) => {

    try {
        //retrive supplierId from req params 
        const { supplierId } =  req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //check if supplierId have value if not throw an error
        if(!supplierId){
            return next(new ErrorResponse("Customer ID Is required", 422));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)


        //DELETE supplier FROM DATA BASE WITH THE DISRE ID VALUE
        await Suppliers.destroy({
            where: {
                id: supplierId
            }
        });

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Supplier Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}