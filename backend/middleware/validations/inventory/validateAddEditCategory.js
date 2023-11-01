//database connection
const db = require('../../../db')

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')


// Validation middleware for creating and editing a category
const validateAddEditCategory = async (req, res, next) => {
    try {

        //retrieve category name from req params to check if the category name is used before uploading to cloudinary
        const { categoryName } = req.params

        // Check if all fields are present
        if (!categoryName) {
            return next(new ErrorResponse("Category Name Is required", 422));
        }

        // Check if the Category name is already exists
        const categoryResponse = await db.query('SELECT * FROM categories WHERE name = $1', [categoryName]);

        //if it there throw an error 
        if(categoryResponse.rows.length > 0){
            return next(new ErrorResponse("Category Already There Use A Diffrent Name", 406));
        }

        next();
    } catch (error) {
        next(error);
    }

};

module.exports = validateAddEditCategory;