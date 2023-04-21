//modles
const Products = require('../../../models/inventory/products');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for creating and editing a category
const validateAddEditProduct = async (req, res, next) => {
    try {

        //retrieve category name from req params to check if the category name is used before uploading to cloudinary
        const { productName } = req.params

        //retrieve store id from rquest authData
        const storeId = req.authData.store_id

        if(!storeId){
            return next(new ErrorResponse("Store ID Is required", 422));
        }

        // Check if all fields are present
        if (!productName) {
            return next(new ErrorResponse("Product Name Is required", 422));
        }

        if(req.method === "PUT"){
            return next();
        }


        // Check if the Category name is already exists
        const existingProduct = await Products.findOne({
            where: {
                name:productName, 
                store_id: storeId
            }
        });

        //if it there throw an error 
        if(existingProduct){
            return next(new ErrorResponse("Product Already There Use A Diffrent Name", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddEditProduct;