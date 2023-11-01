//database connection
const db = require('../../../db')

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for creating and editing a category
const validateAddEditBrand = async (req, res, next) => {
    try {

        //retrieve category name from req params to check if the category name is used before uploading to cloudinary
        const { brandName } = req.params

        // Check if all fields are present
        if (!brandName) {
            return next(new ErrorResponse("Brand Name Is required", 422));
        }

        // Check if the Category name is already exists
        const brandResponse = await db.query('SELECT * FROM brands WHERE name = $1', [brandName]);

        //if it there throw an error 
        if(brandResponse.rows.length > 0){
            return next(new ErrorResponse("Brand Already There Use A Diffrent Name", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddEditBrand;