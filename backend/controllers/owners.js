const Owners = require("../models/sotres/owners");
const { getOrderOptions } = require("../utils/functions/orderOptions");

const OwnersStore = require("../models/sotres/ownerStores");
const Stores = require("../models/sotres/stores");


exports.fetchAllOwners = async (req, res, next) => {
    try {
        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page) {
            return next(new ErrorResponse('Page Number Are Required', 400));
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
                through: {
                    model: OwnersStore
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
        
        const owner = await Owners.findOne({
            where:{
                id:ownerId
            }
        })

        if(owner){

            return res.status(200).json({owner})

        }else{
            return next(new ErrorResponse("There Is No Owner With This ID ", 404));
        }

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}
