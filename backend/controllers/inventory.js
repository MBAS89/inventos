//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//db connection
const db = require('../db');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../utils/functions/cloudinary/cloudinaryUtils');


exports.addCategory = async (req, res, next) => {

    try {

        //retrive storeId & categoryName from req body 
        const { storeId, categoryName } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //INSERT this categorty to the data base 
        const categoryResponse = await db.query('INSERT INTO categories (image, name, store_id, image_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [imageUrl, categoryName, storeId, imageId]
        )

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Category Added",
            results:categoryResponse.rows.length,
            data: {
                category:categoryResponse.rows[0]
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeCategory = async (req, res, next) => {

   try {

        //retrive categoryId from req params 
        const { categoryId } = req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

        //check if categoryid have value if not throw an error
        if(!categoryId){
            return next(new ErrorResponse("Category ID Is required", 422));
        }

        //DELETE CATEGORY FROM DATA BASE WITH THE DISRE ID VALUE
        await db.query("DELETE FROM categories where category_id = $1", [categoryId])

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Category Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editCategory = async (req, res, next) => {
    try {
        //retrive categoryId from req params 
        const { categoryId } = req.params
        //retrive categoryId from req body 
        const { categoryName } = req.body;

        //fetch the old image id category 
        const oldCategoryImageId = await db.query(
            'SELECT image_id FROM categories where category_id = $1',
            [categoryId]
        )

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Edit category in database with new values
        const categoryResponse = await db.query(
            "UPDATE categories SET name = $1, image = $2, image_id = $3 WHERE category_id = $4 returning *", 
            [categoryName, imageUrl, imageId, categoryId]
        )

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!categoryResponse.rows[0]){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldCategoryImageId.rows[0].image_id)

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Category Updated",
            cloudinary:result,
            results:categoryResponse.rows.length,
            data: {
                category:categoryResponse.rows[0]
            }
        })
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}



exports.addBrand = async (req, res, next) => {
    try {

        //retrive storeId & brandName from req body 
        const { storeId, brandName } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //INSERT this categorty to the data base 
        const brandResponse = await db.query('INSERT INTO brands (image, name, store_id, image_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [imageUrl, brandName, storeId, imageId]
        )

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Brand Added",
            results:brandResponse.rows.length,
            data: {
                brand:brandResponse.rows[0]
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeBrand = async (req, res, next) => {
    try {

        //retrive brandId from req params 
        const { brandId } = req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

        //check if brandId have value if not throw an error
        if(!brandId){
            return next(new ErrorResponse("Brand ID Is required", 422));
        }

        //DELETE BRAND FROM DATA BASE WITH THE DISRE ID VALUE
        await db.query("DELETE FROM brands where brand_id = $1", [brandId])

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Brand Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editBrand = async (req, res, next) => {
    try {
        //retrive brandId from req params 
        const { brandId } = req.params
        //retrive Brand Name from req body 
        const { brandName } = req.body;

        //fetch the old image id category 
        const oldBrandImageId = await db.query(
            'SELECT image_id FROM brands where brand_id = $1',
            [brandId]
        )

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Edit category in database with new values
        const brandResponse = await db.query(
            "UPDATE brands SET name = $1, image = $2, image_id = $3 WHERE brand_id = $4 returning *", 
            [brandName, imageUrl, imageId, brandId]
        )

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!brandResponse.rows[0]){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldBrandImageId.rows[0].image_id)

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Brand Updated",
            cloudinary:result,
            results:brandResponse.rows.length,
            data: {
                brand:brandResponse.rows[0]
            }
        })
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}



exports.addProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

exports.removeProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

exports.editProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}