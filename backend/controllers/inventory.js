const { Op } = require('sequelize');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//modles
const Categories = require('../models/inventory/categories');
const Brands = require('../models/inventory/brands');
const Products = require('../models/inventory/products');


//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../utils/functions/cloudinary/cloudinaryUtils');
const { checkRequiredFields } = require('../utils/functions/checkRequiredFileds');
const { getOrderOptions } = require('../utils/functions/orderOptions');



/* *
 * 
 * 
 * 
 * CATEGORIES CONTROLLERS
 * 
 * 
 * 
 * */


exports.readSingleCategory = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { categoryId, withProducts, page, limit = 10 } = req.query;

        if (!categoryId || !storeId) {
            return next(new ErrorResponse('Category ID and Store ID are required', 400));
        }
        
        const category = await Categories.findOne({
            where: { 
                store_id: storeId,
                category_id: categoryId
            }
        })

        if(!category){
            return  next(new ErrorResponse('No Category Found!', 404))
        }

        if(withProducts){

            const totalCount = await Products.count({ where: { store_id: storeId, category_id:category.category_id } });

            const totalPages = Math.ceil(totalCount / limit);

            const currentPage = parseInt(page);

            const products = await Products.findAll({
                where:{
                    store_id: storeId,
                    category_id:category.category_id
                },
                limit:parseInt(limit),
                offset:(currentPage - 1) * parseInt(limit),
            })

            return res.status(200).json({ category, products,  totalCount, totalPages, currentPage });
        }else{
            return res.status(200).json({ category });
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readCategories = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Categories.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { name: { [Op.iLike]: `%${searchQuery}%` } },
                { category_id: searchQuery ? searchQuery : null},
            ]
        } : { store_id: storeId };

        const categories = await Categories.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : []
        });

        const categoryProductCounts = await Promise.all(categories.map(async category => {
            const productCount = await Products.count({ where: { category_id: category.category_id } });
            return {
                categoryId: category.category_id,
                productCount: productCount
            };
        }));

        return res.status(200).json({ totalCount, totalPages, currentPage, categories, categoryProductCounts });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addCategory = async (req, res, next) => {

    try {
        //retrive storeId from token 
        const storeId = req.authData.store_id
        //retrive categoryName from req body 
        const { categoryName } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //INSERT this categorty to the data base 
        const category = await Categories.create({
            image: imageUrl,
            name: categoryName,
            store_id: storeId,
            image_id: imageId
        });

        //return success response with message
        res.status(201).json({
            status: "success",
            message: "Category Added",
            results: 1,
            data: {
                category
            }
        });

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

        //check if categoryid have value if not throw an error
        if(!categoryId){
            return next(new ErrorResponse("Category ID Is required", 422));
        }

        //DELETE CATEGORY FROM DATA BASE WITH THE DISRE ID VALUE
        const category = await Categories.destroy({
            where: {
                category_id: categoryId
            }
        });

        if(!category){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Category Deleted",
        })
        
    } catch (error) {
        if(error.name == 'SequelizeForeignKeyConstraintError'){
            return next(new ErrorResponse("Category Can't be deleted beacuase it's has products", 406));
        }else{
            //if there is an error send it to the error middleware to be output in a good way 
            next(error)
        }


    }
}

exports.editCategory = async (req, res, next) => {

    try {
        //retrive categoryId from req params 
        const { categoryId } = req.params
        //retrive categoryId from req body 
        const { categoryName } = req.body;



        //fetch the old image id category 
        const category = await Categories.findOne({
            where: {
                category_id: categoryId
            },
            attributes: ['image_id', 'image']
        });

        // If the category exists, extract the image ID
        const oldCategoryImageId = category ? category.image_id : null;

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //Edit category in database with new values
        const updatedCategory = await Categories.update(
            { 
                name: categoryName,
                image: imageUrl ? imageUrl : category.image,
                image_id: imageId 
            },
            { returning: true, where: { category_id: categoryId } }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedCategory){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldCategoryImageId)
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Category Updated",
            cloudinary:result || 'no new Image',
            results:1,
            data: {
                category:updatedCategory
            }
        })
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

/* *
 * 
 * 
 * 
 * BRANDS CONTROLLERS
 * 
 * 
 * 
 * */

exports.readSingleBrand = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { brandId, withProducts, page, limit = 10 } = req.query;

        if (!brandId || !storeId) {
            return next(new ErrorResponse('Brand ID and Store ID are required', 400));
        }
        
        const brand = await Brands.findOne({
            where: { 
                store_id: storeId,
                brand_id: brandId
            }
        })

        if(!brand){
            return  next(new ErrorResponse('No Brand Found!', 404))
        }

        if(withProducts){

            const totalCount = await Products.count({ where: { store_id: storeId, brand_id:brand.brand_id } });

            const totalPages = Math.ceil(totalCount / limit);

            const currentPage = parseInt(page);

            const products = await Products.findAll({
                where:{
                    store_id: storeId,
                    brand_id:brand.brand_id
                },
                limit:parseInt(limit),
                offset:(currentPage - 1) * parseInt(limit),
            })

            return res.status(200).json({ brand, products,  totalCount, totalPages, currentPage });
        }else{
            return res.status(200).json({ brand });
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readBrands = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Brands.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { name: { [Op.iLike]: `%${searchQuery}%` } },
                { brand_id: searchQuery ? searchQuery : null},
            ]
        } : { store_id: storeId };

        const brands = await Brands.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : []
        });

        const brandProductCounts = await Promise.all(brands.map(async brand => {
            const productCount = await Products.count({ where: { brand_id: brand.brand_id } });
            return {
                brandId: brand.brand_id,
                productCount: productCount
            };
        }));

        return res.status(200).json({ totalCount, totalPages, currentPage, brands, brandProductCounts });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addBrand = async (req, res, next) => {
    try {
        //retrive storeId from token 
        const storeId = req.authData.store_id
        //retrive brandName from req body 
        const { brandName } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //INSERT this Brand to the data base 
        const brand = await Brands.create({
            image: imageUrl,
            name: brandName,
            store_id: storeId,
            image_id: imageId
        });

        //return success response with message
        res.status(201).json({
            status: "success",
            message: "Brand Added",
            results: 1,
            data: {
                brand
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeBrand = async (req, res, next) => {
    try {

        //retrive BrandId from req params 
        const { brandId } = req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //check if brandId have value if not throw an error
        if(!brandId){
            return next(new ErrorResponse("Brand ID Is required", 422));
        }

        //DELETE BRAND FROM DATA BASE WITH THE DISRE ID VALUE
        const brand = await Brands.destroy({
            where: {
                brand_id: brandId
            }
        });

        if(!brand){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Brand Deleted",
        })
        
    } catch (error) {
        if(error.name == 'SequelizeForeignKeyConstraintError'){
            return next(new ErrorResponse("Brand Can't be deleted beacuase it's has products", 406));
        }else{
            //if there is an error send it to the error middleware to be output in a good way 
            next(error)
        }
    }
}

exports.editBrand = async (req, res, next) => {
    try {
        //retrive brandId from req params 
        const { brandId } = req.params
        //retrive brandName from req body 
        const { brandName } = req.body;

        //fetch the old image id Brand 
        const brand = await Brands.findOne({
            where: {
                brand_id: brandId
            },
            attributes: ['image_id', 'image']
        });

        // If the Brand exists, extract the image ID
        const oldBrandImageId = brand ? brand.image_id : null;

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //Edit brand in database with new values
        const updatedBrand = await Brands.update(
            { 
                name: brandName,
                image: imageUrl ? imageUrl : brand.image,
                image_id: imageId 
            },
            { returning: true, where: { brand_id: brandId } }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedBrand){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldBrandImageId)
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Brand Updated",
            cloudinary:result || 'no new Image',
            results:1,
            data: {
                brand:updatedBrand
            }
        })
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

/* *
 * 
 * 
 * 
 * PRODUCTS CONTROLLERS
 * 
 * 
 * 
 * */
exports.readBrandsAndCategories = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id

        if(!storeId){
            return next(new ErrorResponse('Store ID are required', 400));
        }

        const brands = await Brands.findAll({
            where:{
                store_id:storeId
            },
            attributes:['brand_id', 'name']
        })

        const categories = await Categories.findAll({
            where:{
                store_id:storeId
            },
            attributes:['category_id', 'name']
        })

        return res.status(200).json({ brands, categories });


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readProducts = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Products.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { name: { [Op.iLike]: `%${searchQuery}%` } },
                { sku: { [Op.iLike]: `%${searchQuery}%` } },
                { description: { [Op.iLike]: `%${searchQuery}%` } },
                { product_id: searchQuery ? searchQuery : null},
            ]
        } : { store_id: storeId };

        const products = await Products.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : []
        });


        return res.status(200).json({ totalCount, totalPages, currentPage, products });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.readSingleProduct = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { productId } = req.query;

        if (!productId || !storeId) {
            return next(new ErrorResponse('Product ID and Store ID are required', 400));
        }
        
        const product = await Products.findOne({
            where: { 
                store_id: storeId,
                product_id: productId
            }
        })

        if(!product){
            return  next(new ErrorResponse('No Product Found!', 404))
        }

        return res.status(200).json({ product });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}



exports.addProduct = async (req, res, next) => {
    try {
        //retrieve store id from rquest authData
        const storeId = req.authData.store_id

        //retrive product values from req body 
        const { productName, sku, price, retailPrice, wholesalePrice, qty, description, category_id, brand_id, salePrice, onSale, unit, unit_catergory  } = req.body;

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //Check if all Required Fileds are there
        const requiredFields = ['storeId', 'productName', 'sku', 'price', 'retailPrice', 'wholesalePrice', 'qty', 'unit', 'unit_catergory'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        //INSERT this Product to the data base and set || null for the optianl fileds 
        const newProduct = await Products.create({
            store_id: storeId,
            name: productName,
            image: imageUrl,
            image_id: imageId,
            sku: sku,
            price: price,
            retail_price: retailPrice,
            wholesale_price: wholesalePrice,
            unit: unit || null,
            unit_catergory: unit_catergory || null,
            sale_price: salePrice || null,
            on_sale: onSale || false,
            qty: qty,
            description: description || null,
            category_id: category_id || null,
            brand_id: brand_id || null
        });

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Product Added",
            results:1,
            data: {
                product:newProduct
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

        //check if productId have value if not throw an error
        if(!productId){
            return next(new ErrorResponse("Product ID Is required", 422));
        }

        //DELETE Product FROM DATA BASE WITH THE DISRE ID VALUE
        const product = await Products.destroy({
            where: {
                product_id: productId
            }
        });

        if(!product){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)

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
        //retrive productId from req params 
        const { productId } =  req.params
        //retrive product values from req body 
        const { productName, sku, price, retailPrice, wholesalePrice, qty, description, category_id, brand_id, salePrice, onSale, unit, unit_catergory } = req.body;

        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //check if Product Id Have a value 
        if(!productId){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Product ID Required", 422));
        }

        //fetch the old image id For Product 
        const product = await Products.findOne({
            where: {
                product_id: productId
            },
            attributes: ['image_id']
        });

        // If the product exists, extract the image ID
        const oldProductImageId = product ? product.image_id : null;

        //Check if all Required Fileds are there
        const requiredFields = ['productName', 'sku', 'price', 'retailPrice', 'wholesalePrice', 'qty', 'unit', 'unit_catergory'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }


        //Edit product in database with new values and set || null for the optianl fileds 
        const updatedProduct = await Products.update(
            {
                name: productName,
                image: imageUrl,
                image_id: imageId,
                sku: sku,
                price: price,
                retail_price: retailPrice,
                wholesale_price: wholesalePrice,
                unit,
                unit_catergory,
                sale_price: salePrice || null,
                on_sale: onSale || false,
                qty: qty,
                description: description || null,
                category_id: category_id || null,
                brand_id: brand_id || null
            },
            {
                returning: true,
                where: { product_id: productId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedProduct){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldProductImageId)
        }


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Product Edited",
            cloudinary:result || 'no new Image',
            results:1,
            data: {
                product:updatedProduct
            }
        })

    } catch (error) {
        console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}