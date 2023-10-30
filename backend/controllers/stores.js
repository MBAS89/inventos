//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//database connection
const db = require('../db');

exports.createStore = async (req, res, next) => {
    try {

        //retrive all values from req body 
        const { store_name, owner_first_name, owner_last_name, owner_email, password, phone_number} = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert the store to database
        const storeResponse = await db.query(
            'INSERT INTO stores (store_name, owner_first_name, owner_last_name, owner_email, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [store_name, owner_first_name, owner_last_name, owner_email, hashedPassword, phone_number]
        )

        //check if an owner with this email already in database
        const onwerResponse = await db.query(
            'SELECT * FROM owners WHERE email = $1',
            [owner_email]
        )

        //if owner is in database
        if(onwerResponse.rows.length > 0){
            //owner is there so just add the store to his list becasue owner can have multiple stores
            await db.query(
                'INSERT INTO owner_stores (owner_id, store_id) VALUES ($1, $2)',
                [onwerResponse.rows[0].id, storeResponse.rows[0].id]
            )
        }else{
            //owner is not in database create a new owner 
            const onwerResponse = await db.query(
                'INSERT INTO owners (store_id, email, first_name, last_name, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [storeResponse.rows[0].id, owner_email, owner_first_name, owner_last_name, phone_number, hashedPassword]
            )

            //then add this store to his list 
            await db.query(
                'INSERT INTO owner_stores (owner_id, store_id) VALUES ($1, $2)',
                [onwerResponse.rows[0].id, storeResponse.rows[0].id]
            )
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Store Created",
            results:storeResponse.rows.length,
            data: {
                category:storeResponse.rows[0]
            }
        })
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}