const { Op } = require('sequelize');

const Owners = require("../models/sotres/owners");
const { getOrderOptions } = require("../utils/functions/orderOptions");

//pcakgae to validate email
const validator = require('validator');

const OwnersStore = require("../models/sotres/ownerStores");
const Stores = require("../models/sotres/stores");
const ErrorResponse = require("../utils/errorResponse");
const { checkRequiredFields } = require("../utils/functions/checkRequiredFileds");


exports.fetchAllOwners = async (req, res, next) => {
    try {
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page) {
            return next(new ErrorResponse('Page Number Is Required', 400));
        }
        
        const totalCount = await Owners.count();

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            [Op.or]: [
                { first_name: { [Op.iLike]: `%${searchQuery}%` } },
                { last_name: { [Op.iLike]: `%${searchQuery}%` } },
                { email: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : {};

        const owners = await Owners.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            attributes: { exclude: ['password'] },
            include: {
                model: Stores, 
                through:{
                    model:OwnersStore,
                    attributes:[]
                }
            }
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, owners });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readOwner = async (req, res, next) => {
    try {
        const { ownerId } = req.query
        
        if(!ownerId){
            return next(new ErrorResponse('Owner ID Is Required', 400));
        }

        const owner = await Owners.findOne({
            where:{
                id:ownerId
            },
            include:{
                model:Stores,
                through:{
                    model:OwnersStore,
                    attributes:[]
                },
                attributes:{
                    exclude:['password']
                }
            },
            attributes:{
                exclude:['password']
            }
        })

        if(!owner){
            return next(new ErrorResponse("There Is No Owner With This ID ", 404));
        }

        return res.status(200).json({owner})

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editOwner = async (req, res, next) => {
    try {
        const { ownerId } = req.query
        
        if(!ownerId){
            return next(new ErrorResponse('Owner ID Is Required', 400));
        }

        const { email, first_name, last_name, phone_number } = req.body

        //Check if all Required Fileds are there
        const requiredFields = ['email', 'first_name', 'last_name', 'phone_number'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
        if (!isValidEmail) {
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        const emailUsed = await Owners.findAll({
            where:{
                email,
                id: { [Op.ne]: ownerId }
            },
            attributes:['id']
        })

        if(emailUsed.length > 0){
            return next(new ErrorResponse('Email Is Invalid', 406));
        }


        const updatedOwner = await Owners.update(
            {
                email,
                first_name,
                last_name,
                phone_number
            },
            {
                returning: true,
                where: { id: ownerId }
            }
        )

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedOwner[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        await Stores.update(
            {   
                owner_first_name:first_name,
                owner_last_name:last_name,
                owner_email:email,
                phone_number:phone_number
            },
            {
                returning: true,
                where: { ownerId: ownerId }
            }
        );

        //return success response with message
        return res.status(201).json({
            status:"success",
            message:"Owner Edited",
            data: {
                owner:updatedOwner
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.deleteOwner = async (req, res, next) => {
    try {
        const { ownerId } = req.query

        if(!ownerId){
            return next(new ErrorResponse('Owner ID Is Required', 400));
        }

        const ownerThere = await Owners.findOne({
            where:{
                id:ownerId
            },
            include:{
                model:Stores,
                through:{
                    model:OwnersStore,
                    attributes:[]
                },
                attributes:['id']
            },
            attributes:['id']
        })

        if(!ownerThere){
            return next(new ErrorResponse("There Is No Owner With This ID ", 404));
        }

        if(ownerThere.stores.length > 0){
            return next(new ErrorResponse("You Can't Delete An Owner That Has Stores ", 406));
        }


        const owner = await Owners.destroy({
            where: {
                id:ownerId
            }
        });

        await OwnersStore.destroy({
            where:{
                owner_id:ownerThere.id,
                ownerId:ownerThere.id
            }
        })

        if(!owner){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Owner Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}
