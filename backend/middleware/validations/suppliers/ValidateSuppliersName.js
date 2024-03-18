//modle
const Suppliers = require('../../../models/suppliers/suppliers');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing 
const ValidateSuppliersName = async (req, res, next) => {
    try {
        const store_id = req.authData.store_id
        //retrieve Supplier name from req query to check if the Supplier name is used before uploading to cloudinary
        const { supplierName } = req.query

        // Check if all fields are present
        if (!supplierName || !store_id) {
            return next(new ErrorResponse("Supplier Name And Store ID Is required", 422));
        }

        if (req.path.includes('/remove')) {
            next();
        }else{
            // Check if the Supplier name is already exists
            const existingSupplier = await Suppliers.findOne({
                where: {
                    supplier_name: supplierName,
                    store_id
                }
            });

            //if it there throw an error 
            if (existingSupplier) {
                return next(new ErrorResponse("Supplier Already Exists. Please Use a Different Name", 406));
            }

            next();
        }

    } catch (error) {
        next(error);
    }

};

module.exports = ValidateSuppliersName;