const express = require('express')
const router = express.Router()

//validations middlewares
const validateAddEditCategory = require('../middleware/validations/inventory/validateAddEditCategory')
const validateAddEditBrand = require('../middleware/validations/inventory/validateAddEditBrand')
const validateAddEditProduct = require('../middleware/validations/inventory/validateAddEditProduct')

//upload to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//inventory  controllers
const { addCategory, removeCategory, editCategory, addBrand, removeBrand, editBrand, addProduct, removeProduct, editProduct, readSingleCategory, readCategories } = require('../controllers/inventory')
const Auth = require('../middleware/auth/authMiddleware')


//inventory routes
router.get('/category/read/single', Auth, readSingleCategory)
router.get('/category/read', Auth, readCategories)
router.post('/category/add/:categoryName', Auth, validateAddEditCategory, uploadMiddleware, addCategory)
router.delete('/category/remove/:categoryId', Auth, removeCategory)
router.put('/category/edit/:categoryId/:categoryName', Auth, validateAddEditCategory, uploadMiddleware, editCategory)

router.post('/brand/add/:brandName', Auth, validateAddEditBrand, uploadMiddleware, addBrand)
router.delete('/brand/remove/:brandId', Auth, removeBrand)
router.put('/brand/edit/:brandId/:brandName', Auth, validateAddEditBrand, uploadMiddleware, editBrand)

router.post('/product/add/:productName', Auth, validateAddEditProduct, uploadMiddleware, addProduct)
router.delete('/product/remove/:productId', Auth, removeProduct)
router.put('/product/edit/:productId/:productName', Auth, validateAddEditProduct, uploadMiddleware, editProduct)


module.exports = router