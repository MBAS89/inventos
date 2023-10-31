//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//error handler
const ErrorResponse = require('../utils/errorResponse');

//database connection
const db = require('../db');


exports.addAdmin = async (req, res, next) => {

    try {

        //retrive all values from req body 
        const { store_id, first_name, last_name, email, password, phone_number} = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert the admin to database in the store that he belong to
        const adminResponse = await db.query(
            'INSERT INTO admins (store_id, first_name, last_name, email, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [store_id, first_name, last_name, email, hashedPassword, phone_number]
        )

        //if the adding did not work throw an error
        if(adminResponse.rows.length <= 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Admin Added",
            results:adminResponse.rows.length,
            data: {
                admin:adminResponse.rows[0]
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}