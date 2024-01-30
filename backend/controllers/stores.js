//cahe libray
const NodeCache = require("node-cache");
const cache = new NodeCache();

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//models 
const Stores = require('../models/sotres/stores');
const Owners = require('../models/sotres/owners');
const OwnersStore = require('../models/sotres/ownerStores');
const Employees = require('../models/employees/employees');

//function to generate Token to auth 
const { generateToken } = require('../utils/generatToken');


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

exports.storeLogin = async (req, res, next) => {
    try {
        //retrive all values from req body 
        const { store_name, email, password } = req.body

        //check if the store is there
        const store = await Stores.findOne({
            where:{
                store_name
            }
        })

        //if store is not there
        if(!store){
            //send message saying store not found
            return next(new ErrorResponse("Store Not Found!", 404));
        }

        //if store is there we will know check if the user login is the store owner 
        const owner = await Owners.findOne({
            where: {
                email: email,
                store_id:store.id
            }
        })

        //if the logged in is the store owner 
        if(owner){
            //compare password to the exsisting owner password
            const passwordMatch = await bcrypt.compare(password, owner.password)

            //if password dose not we will reposnse with an error
            if(!passwordMatch){
                //send message saying store not found
                return next(new ErrorResponse("Invalid Email Or Password", 401));
            }

            //if password pass we will create a payload to put into the token
            const payload = {
                store_id:store.id,
                store_name:store.store_name,
                id:owner.id,
                email:owner.email,
                name:`${owner.first_name} ${owner.last_name}`,
                role:"owner"
            }

            //calling the generate token funtion this will put token in req.cookie
            generateToken(res, payload)

            //return response of the req
            res.status(201).json({
                status:"success",
                message:"Login Successful",
            })


        //if the logged in is not the store owner we will check if he is an employee of that store 
        }else{
            //check if emlpoyee is for this store 
            const employee = await Employees.findOne({
                where: {
                    email: email,
                    store_id:store.id
                }
            })

            if(!employee){
                return next(new ErrorResponse("Invalid Email Or Password", 401));
            }

            //compare password to the exsisting employee password
            const passwordMatch = await bcrypt.compare(password, employee.password)

            //if password dose not we will reposnse with an error
            if(!passwordMatch){
                //send message saying store not found
                return next(new ErrorResponse("Invalid Email Or Password", 401));
            }

            //check if employee still work here
            if(employee.status === "out-payroll"){
                //send message to employee telling him you are not granted to enter 
                return next(new ErrorResponse(`You No Longer Work Here Contact Owner`, 401));
            }

            //if password pass we will create a payload to put into the token
            const payload = {
                store_id:store.id,
                store_name:store.store_name,
                id:employee.id,
                email:employee.email,
                name:employee.full_name,
                role:employee.roleId
            }

            //calling the generate token funtion this will put token in req.cookie
            generateToken(res, payload)

            //return response of the req
            res.status(200).json({
                status:"success",
                message:"Login Successful",
            })

        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.storelogout = async (req, res, next) => {
    try {
        //remove the token form the request by setting expire time to 0 
        res.cookie('jwt', '', {
            httpOnly:true,
            expires: new Date(0)
        })

        // delete token form cahe
        cache.del(req.cookies.jwt)  //req.cookies.jwt is the key of the token 

        //return response of the req
        res.status(200).json({
            status:"success",
            message:"Logout Successful",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}