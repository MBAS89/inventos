//modles
const Suppliers = require('../../models/suppliers/suppliers');

//pcakgae to validate email
const validator = require('validator');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../../utils/functions/cloudinary/cloudinaryUtils');
//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');
const SuppliersTypes = require('../../models/suppliers/suppliersType');
const { Op } = require('sequelize');
const ErrorResponse = require('../../utils/errorResponse');
const { getOrderOptions } = require('../../utils/functions/orderOptions');
const { OuterInvoices, OuterInvoiceItems } = require('../../models/sales/outerInvoices');
const Products = require('../../models/inventory/products');
const OldInventory = require('../../models/inventory/oldInventory');
const Employees = require('../../models/employees/employees');


exports.getSuppliers = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Suppliers.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { supplier_name: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.like]: `%${searchQuery}%` } },
                { address: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
            ]
        } : { store_id: storeId };

        const suppliers = await Suppliers.findAll({
            where: whereClause,
            limit: searchQuery ? undefined : parseInt(limit),
            offset: searchQuery ? undefined : (currentPage - 1) * parseInt(limit),
            include:[
                {
                    model:SuppliersTypes,
                    attributes:['type_name', 'id']
                }
            ],
            order:column && sort ? getOrderOptions(column, sort) : []
        });

        

        return res.status(200).json({ totalCount, totalPages, currentPage, suppliers });


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.getSingleSuppliers = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { supplierId, page, limit = 10 } = req.query;

        if (!supplierId || !storeId) {
            return next(new ErrorResponse('Supplier ID and Store ID are required', 400));
        }
        
        const supplier = await Suppliers.findOne({
            where: { 
                store_id: storeId,
                id: supplierId
            },
            include:[
                {
                    model:SuppliersTypes,
                    attributes:['type_name', 'id']
                }
            ],
        })

        if(!supplier){
            return  next(new ErrorResponse('No Supplier Found!', 404))
        }

        const totalCount = await OuterInvoices.count({ where: { store_id: storeId,  suppliersId:supplier.id } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const invoices = await OuterInvoices.findAll({
            where:{
                store_id: storeId,
                suppliersId:supplier.id
            },
            limit:parseInt(limit),
            offset:(currentPage - 1) * parseInt(limit),
            include: [
                {
                    model: OuterInvoiceItems,
                    as: 'items',
                    include: [
                        {
                            model: Products,
                            attributes: ['product_id', 'name', 'image', 'sku', 'retail_price_unit', 'pieces_per_unit', 'retail_price_piece'],
                            include:[
                                {
                                    model:OldInventory
                                }
                            ]
                        }
                    ]
                },
                {
                    model:Employees,
                    attributes: ['id', 'full_name', 'image'],
                }
            ]
        })

        res.status(200).json({ supplier, invoices, totalCount, totalPages, currentPage });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.addSupplier = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id
        //retrive Customer values from req body 
        const { supplier_name, email, phone_number, address, supplier_type } = req.body

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

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


        //INSERT this Supplier to the data base
        const supplier = await Suppliers.create({
            store_id,
            supplier_name,
            image: imageUrl,
            image_id: imageId,
            email,
            phone_number,
            address,
            supplier_type_id:supplier_type || null
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
        const { supplier_name, email, phone_number, address, supplier_type, oldImage } = req.body

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //check if supplierId Have a value 
        if(!supplierId){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
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


        //Edit Supplier in database with new values 
        const updatedSupplier = await Suppliers.update(
            {
                supplier_name,
                image: imageUrl ? imageUrl : oldImage,
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
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldSupplierImageId)
        }


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Supplier Edited",
            cloudinary:result || 'no new Image',
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
            return next(new ErrorResponse("Supplier ID Is required", 422));
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