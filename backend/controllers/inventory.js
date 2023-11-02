//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//db connection
const db = require('../db');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../utils/functions/cloudinary/cloudinaryUtils');
const { checkRequiredFields } = require('../utils/functions/checkRequiredFileds');


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

        //fetch the old image id brand 
        const oldBrandImageId = await db.query(
            'SELECT image_id FROM brands where brand_id = $1',
            [brandId]
        )

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Edit brand in database with new values
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

        //retrive product values from req body 
        const { storeId, productName, sku, price, retailPrice, wholesalePrice, qty, description, category_id, brand_id, salePrice, onSale  } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Check if all Required Fileds are there
        const requiredFields = ['storeId', 'productName', 'sku', 'price', 'retailPrice', 'wholesalePrice', 'qty'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        //INSERT this Product to the data base and set || null for the optianl fileds 
        const productResponse = await db.query(
            'INSERT INTO products (store_id, name, image, image_id, sku, price, retail_price, wholesale_price, sale_price, on_sale, qty, description, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [storeId, productName, imageUrl, imageId, sku, price, retailPrice, wholesalePrice, salePrice || null, onSale || false, qty, description || null, category_id || null, brand_id || null]
        )

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Product Added",
            results:productResponse.rows.length,
            data: {
                product:productResponse.rows[0]
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeProduct = async (req, res, next) => {
    try {

        //retrive productId from req params 
        const { productId } = req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

        //check if productId have value if not throw an error
        if(!productId){
            return next(new ErrorResponse("Product ID Is required", 422));
        }

        //DELETE Product FROM DATA BASE WITH THE DISRE ID VALUE
        await db.query("DELETE FROM products where product_id = $1", [productId])

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Product Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editProduct = async (req, res, next) => {
    try {
        
        //retrive brandId from req params 
        const { productId } =  req.params
        //retrive product values from req body 
        const { productName, sku, price, retailPrice, wholesalePrice, qty, description, category_id, brand_id, salePrice, onSale  } = req.body;

        //fetch the old image id For Product 
        const oldProductImageId = await db.query(
            'SELECT image_id FROM products where product_id = $1',
            [productId]
        )

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //check if Product Id Have a value 
        if(!productId){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Product ID Required", 422));
        }

        //Check if all Required Fileds are there
        const requiredFields = ['productName', 'sku', 'price', 'retailPrice', 'wholesalePrice', 'qty'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        //Edit product in database with new values and set || null for the optianl fileds 
        const productResponse = await db.query(
            "UPDATE products SET name = $1, image = $2, image_id = $3, sku = $4, price = $5, retail_price = $6, wholesale_price = $7, sale_price = $8, on_sale = $9, qty = $10, description = $11, category_id = $12, brand_id = $13  WHERE product_id = $14 returning *", 
            [productName, imageUrl, imageId, sku, price, retailPrice, wholesalePrice, salePrice || null, onSale || false, qty, description || null, category_id || null, brand_id || null, productId]
        )

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!productResponse.rows[0]){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldProductImageId.rows[0].image_id)


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Product Edited",
            cloudinary:result,
            results:productResponse.rows.length,
            data: {
                product:productResponse.rows[0]
            }
        })

    } catch (error) {
        console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}