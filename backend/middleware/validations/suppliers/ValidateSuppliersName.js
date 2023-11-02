//modle
const Suppliers = require('../../../models/suppliers/suppliers');

//error response middleware
const ErrorResponse = require('../../../utils/errorResponse')

// Validation middleware for creating and editing 
const ValidateSuppliersName = async (req, res, next) => {
    try {
        //retrieve Supplier name from req query to check if the Supplier name is used before uploading to cloudinary
        const { supplierName, storeId } = req.query

        // Check if all fields are present
        if (!supplierName || !storeId) {
            return next(new ErrorResponse("Supplier Name And Store ID Is required", 422));
        }

        console.log(req.path)
        if (req.path.includes('/remove')) {
            next();
        }else{
            // Check if the Supplier name is already exists
            const existingSupplier = await Suppliers.findOne({
                where: {
                    supplier_name: supplierName,
                    store_id: storeId
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