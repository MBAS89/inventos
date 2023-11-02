const express = require('express')
const router = express.Router()

//validations middlewares
const validateAddEditCategory = require('../middleware/validations/inventory/validateAddEditCategory')
const validateAddEditBrand = require('../middleware/validations/inventory/validateAddEditBrand')
const validateAddEditProduct = require('../middleware/validations/inventory/validateAddEditProduct')

//upload to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//inventory  controllers
const { addCategory, removeCategory, editCategory, addBrand, removeBrand, editBrand, addProduct, removeProduct, editProduct } = require('../controllers/inventory')

//inventory routes
router.post('/category/add/:categoryName', validateAddEditCategory, uploadMiddleware, addCategory)
router.delete('/category/remove/:categoryId', removeCategory)
router.put('/category/edit/:categoryId/:categoryName', validateAddEditCategory, uploadMiddleware, editCategory)

router.post('/brand/add/:brandName', validateAddEditBrand, uploadMiddleware, addBrand)
router.delete('/brand/remove/:brandId', removeBrand)
router.put('/brand/edit/:brandId/:brandName', validateAddEditBrand, uploadMiddleware, editBrand)

router.post('/product/add/:productName', validateAddEditProduct, uploadMiddleware, addProduct)
router.delete('/product/remove/:productId', removeProduct)
router.put('/product/edit/:productId/:productName', validateAddEditProduct, uploadMiddleware, editProduct)


module.exports = router