//error response middleware
const ErrorResponse = require('../../utils/errorResponse');

//modles
const SuppliersTypes = require('../../models/suppliers/suppliersType');

exports.readSupplierTypes = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        //Fetch All Suppliers type
        const supplierTypes = await SuppliersTypes.findAll({
            where:{ store_id },
            order: [['id', 'ASC']] 
        })

        //if response with an error
        if(!supplierTypes){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(200).json({supplierTypes})


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addSupplierType = async (req, res, next) => {

    try {
        const store_id = req.authData.store_id

        //retrieve values from req.body 
        const { type_name } = req.body

        //create Supplier type
        const supplierType = await SuppliersTypes.create({
            store_id,
            type_name
        })

        //if creating response with an error
        if(!supplierType){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Supplier Type Created",
            results:1,
            data: {
                supplierType
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editSupplierType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.params

        //retrieve new values from req.body 
        const { type_name } = req.body

        //update supplier type with the new values 
        const supplierType = await SuppliersTypes.update(
            {
                type_name
            },
            { 
                where: { id: typeId },
                returning: true
            }
        );

        //if updating response with an error
        if(!supplierType){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Supplier Type Updated",
            results:1
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeSupplierType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.params

        //delete customer type from database
        const supplierType = await SuppliersTypes.destroy({
            where: { id: typeId },
            returning: true
        });

        //if deleting response with an error
        if(!supplierType){
            return next(new ErrorResponse("Something went wrong!", 500));
        }

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Supplier Type Deleted",
            results:1
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}