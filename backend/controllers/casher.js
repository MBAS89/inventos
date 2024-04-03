const { Op } = require('sequelize');

const Brands = require("../models/inventory/brands")
const Categories = require("../models/inventory/categories");
const Products = require('../models/inventory/products');


//error handler
const ErrorResponse = require('../utils/errorResponse');
const OldInventory = require('../models/inventory/oldInventory');

exports.readBrandsAndCategories = async (req, res, next) => {
    try {

        const storeId = req.authData.store_id;

        // Fetch brands and categories in parallel
        const [brands, categories] = await Promise.all([
            Brands.findAll({
                where: { store_id: storeId },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }),
            Categories.findAll({
                where: { store_id: storeId },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
        ]);
        
        // Fetch total products for brands and categories in parallel
        const [brandsWithTotalProducts, categoriesWithTotalProducts] = await Promise.all([
            Promise.all(brands.map(async (brand) => {
                const totalProducts = await Products.count({ where: { store_id: storeId, brand_id: brand.brand_id } });
                return { ...brand.toJSON(), totalProducts };
            })),
            Promise.all(categories.map(async (category) => {
                const totalProducts = await Products.count({ where: { store_id: storeId, category_id: category.category_id } });
                return { ...category.toJSON(), totalProducts };
            }))
        ]);
        
        return res.status(200).json({ brands: brandsWithTotalProducts, categories: categoriesWithTotalProducts });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.readSingleBrandAndCategory = async (req, res, next) => {
    try {

        const storeId = req.authData.store_id

        const { page, limit = 12, searchQuery, brandId, categoryId } = req.query;

        if (!page || !storeId) {
            return next(new ErrorRes('Page Number and Store ID are required', 400));
        }

        if (!brandId && !categoryId) {
            return res.send('')
        }


        const totalCount = await Products.count({ 
            where: {
                store_id: storeId,
                [categoryId ? 'category_id' : 'brand_id']: categoryId || brandId
            } 
        });

        const totalPages = Math.ceil(totalCount / limit);

        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [categoryId ? 'category_id' : 'brand_id']: categoryId || brandId,
            [Op.or]: [
                { name: { [Op.iLike]: `%${searchQuery}%` } },
                { sku: { [Op.iLike]: `%${searchQuery}%` } }
            ]
        } : { store_id: storeId, [categoryId ? 'category_id' : 'brand_id']: categoryId || brandId };

        const products = await Products.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order: [['createdAt', 'DESC']],
            include:{
                model:OldInventory,
                order: [['createdAt', 'ASC']] 
            }
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, products });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}