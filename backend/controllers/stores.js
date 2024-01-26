//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');
const Stores = require('../models/sotres/stores');
const Owners = require('../models/sotres/owners');
const OwnersStore = require('../models/sotres/ownerStores');


exports.createStore = async (req, res, next) => {
    try {

        //retrive all values from req body 
        const { store_name, owner_first_name, owner_last_name, owner_email, password, phone_number} = req.body

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert the store to database
        const store = await Stores.create({
            store_name,
            owner_first_name,
            owner_last_name,
            owner_email,
            password: hashedPassword,
            phone_number
        });

        //check if an owner with this email already in database
        const owner = await Owners.findOne({
            where: {
                email: owner_email
            }
        });

        //if owner is in database
        if(owner){
            
            //owner is there so just add the store to his list becasue owner can have multiple stores
            await OwnersStore.create({
                owner_id:owner.id,
                store_id:store.id
            });

        }else{
            //owner is not in database create a new owner 
            const owner = await Owners.create({
                store_id: store.id,
                email: owner_email,
                first_name: owner_first_name,
                last_name: owner_last_name,
                phone_number,
                password: hashedPassword
            });

            //then add this store to his list 
            await OwnersStore.create({
                owner_id:owner.id,
                store_id:store.id
            });
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Store Created",
            //results:storeResponse.rows.length,
            data: {
                store
            }
        })
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}