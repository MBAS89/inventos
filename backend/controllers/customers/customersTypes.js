//modles
const CustomersTypes = require('../../models/cutomers/customersTypes');

//middleware to handle Erorrs
const ErrorResponse = require('../../utils/errorResponse');

exports.getCustomerTypes = async (req, res, next) => {
    try {

        const storeId = req.authData.store_id

        const customersTypes = await CustomersTypes.findAll({
            where:{
                store_id:storeId
            }
        })


        if(customersTypes.length == 0){
            return next(new ErrorResponse('No Customers Types Found', 404))
        }

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Customers Types Fetched",
            data: {
                customersTypes
            }
        })
        
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        return next(new ErrorResponse("Something Went Wrong", 500));
    }
}

exports.addCustomerType = async (req, res, next) => {

    try {
        //retrieve values from req.body 
        const storeId = req.authData.store_id
        const { type_name, discount_value } = req.body

        //create cutomer type
        const customerType = await CustomersTypes.create({
            store_id:storeId,
            type_name:type_name.toLowerCase(),
            discount_value
        })

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Customer Type Created",
            results:1,
            data: {
                customerType
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        return next(new ErrorResponse("Something Went Wrong", 500));
    }
}

exports.editCustomerType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.params
        //retrieve new values from req.body 
        const { type_name, discount_value } = req.body

        //update cutomer type with the new values 
        await CustomersTypes.update(
            {
                type_name:type_name.toLowerCase(),
                discount_value
            },
            {
                where: { id: typeId }
            }
        );

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Customer Type Updated",
            results:1
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        return next(new ErrorResponse("Something Went Wrong", 500));
    }
}

exports.removeCustomerType = async (req, res, next) => {

    try {
        //retrieve typeId from the req params
        const { typeId } = req.params

        //delete customer type from database
        await CustomersTypes.destroy({
            where: { id: typeId }
        });

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Customer Type Deleted",
            results:1
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        return next(new ErrorResponse("Something Went Wrong", 500));
    }
}