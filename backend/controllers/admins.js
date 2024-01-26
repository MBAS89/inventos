//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//error handler
const ErrorResponse = require('../utils/errorResponse');

//modles
const Admins = require('../models/sotres/admins');

exports.addAdmin = async (req, res, next) => {

    try {

        //retrive all values from req body 
        const { store_id, first_name, last_name, email, password, phone_number} = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert the admin to database in the store that he belong to
        const admin = await Admins.create({
            store_id,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone_number
        });

        //if the adding did not work throw an error
        if (!admin) {
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return response of the req
        res.status(201).json({
            status: "success",
            message: "Admin Added",
            results: 1,
            data: {
                admin
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeAdmin = async (req, res, next) => {

    try {

        //retrive all values from req body 
        const { storeId } = req.params
        const { email } = req.query

        //check if all fileds are there
        if(!storeId || !email){
            return next(new ErrorResponse("A Store ID AND Email Required"))
        }

        //delete admin from admins table where store id and email match the giving values 
        await Admins.destroy({
            where: {
                store_id: storeId,
                email: email
            }
        });


        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Admin Removed"
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}