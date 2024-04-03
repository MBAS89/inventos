const { Sequelize } = require("sequelize");
const { Op } = require('sequelize');
const Coupon = require("../models/inventory/coupon");
const ErrorResponse = require("../utils/errorResponse");
const { checkRequiredFields } = require('../utils/functions/checkRequiredFileds');
const { getOrderOptions } = require("../utils/functions/orderOptions");


exports.readCoupons = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { page, limit = 13, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }

        const totalCount = await Coupon.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { code: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : { store_id: storeId };

        const coupon = await Coupon.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']]
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, coupon });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error) 
    }
}

exports.readCoupon = async (req, res, next) => {
    try {
        const { couponId } = req.query
        
        const coupon = await Coupon.findOne({
            where:{
                id:couponId
            }
        })

        if(coupon){

            return res.status(200).json({coupon})

        }else{
            return next(new ErrorResponse("There Is No Coupon With This ID ", 404));
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.checkCoupon = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id
        const { code } = req.query
        
        const coupon = await Coupon.findOne({
            where:{
                code,
                store_id:storeId
            }
        })

        if(coupon){

            if(coupon.used && coupon.can_be_used_times > 0){
                return next(new ErrorResponse("Coupon Used", 406));
            }else{
                if(coupon.expires_in < new Date()){
                    return next(new ErrorResponse("Coupon Is Expired", 406));
                }

                //return success response with message
                res.status(200).json({coupon})
            }

        }else{
            return next(new ErrorResponse("There Is No Coupon With This Code ", 404));
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addCoupon = async (req, res, next) => {
    try {
        const storeId = req.authData.store_id;

        const { code, expires_in, used, kind, value, can_be_used_times } = req.body

        //Check if all Required Fileds are there
        const requiredFields = ['code', 'kind', 'value'];

        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const couponThere = await Coupon.findOne({
            where:{
                store_id:storeId,
                code:code
            }
        })

        if(couponThere){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse('Coupon is Already there', 406));
        }

        const coupon = await Coupon.create({
            code,
            expires_in:expires_in || null,
            used,
            kind,
            value,
            can_be_used_times: can_be_used_times || 1,
            store_id: storeId
        })

        //return success response with message
        res.status(201).json({
            status: "success",
            message: "Coupon Added",
            data: {
                coupon
            }
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editCoupon = async (req, res, next) => {

    try {
        const { couponId } = req.query

        const { code, expires_in, used, kind, value, can_be_used_times } = req.body
    
        //Check if all Required Fileds are there
        const requiredFields = ['code', 'kind', 'value'];
    
        const validationError = checkRequiredFields(next, req.body, requiredFields);
    
        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }
    
        const checkCode = await Coupon.findOne({
            where: {
                code: code,
                id: { [Sequelize.Op.ne]: couponId } 
            }
        });
    
        if(checkCode){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("This code is invalid. Please use a different one.", 406));
        }
        
        const updatedCoupon= await Coupon.update(
            { 
                code,
                expires_in,
                used,
                kind,
                value,
                can_be_used_times
            },
            { returning: true, where: { id: couponId } }
        );
    
        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(!updatedCoupon){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }
    
        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Coupon Updated",
            data: {
                coupon:updatedCoupon
            }
        })
    
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.removeCoupon = async (req, res, next) => {
    try {
        const { couponId } = req.query

        //check if there is a coupon with this Id

        const coupon = await Coupon.findOne({
            where:{
                id:couponId
            },
            attribute:['id']
        })

        if(coupon){
            //DELETE Coupon FROM DATA BASE WITH THE DISRE ID VALUE
            const coupon = await Coupon.destroy({
                where: {
                    id:couponId,
                }
            });

            if(!coupon){
                return next(new ErrorResponse("Something went wrong!", 500));
            }

            //return success response with message
            res.status(200).json({
                status:"success",
                message:"Coupon Deleted",
            })

        }else{
            return next(new ErrorResponse("There Is No Coupon With This ID ", 404));
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}