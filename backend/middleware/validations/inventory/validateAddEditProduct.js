//database connection
const db = require('../../../db')

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for creating and editing a category
const validateAddEditProduct = async (req, res, next) => {
    try {

        //retrieve category name from req params to check if the category name is used before uploading to cloudinary
        const { productName } = req.params

        // Check if all fields are present
        if (!productName) {
            return next(new ErrorResponse("Product Name Is required", 422));
        }

        // Check if the Category name is already exists
        const productResponse = await db.query('SELECT * FROM products WHERE name = $1', [productName]);

        //if it there throw an error 
        if(productResponse.rows.length > 0){
            return next(new ErrorResponse("Product Already There Use A Diffrent Name", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddEditProduct;