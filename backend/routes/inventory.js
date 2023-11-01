const express = require('express')
const router = express.Router()

//validations middlewares
const validateAddEditCategory = require('../middleware/validations/inventory/validateAddEditCategory')

//upload to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//inventory  controllers
const { addCategory, removeCategory, editCategory, addBrand, removeBrand, editBrand, addProduct, removeProduct, editProduct } = require('../controllers/inventory')


//inventory routes
router.post('/category/add/:categoryName', validateAddEditCategory, uploadMiddleware, addCategory)
router.delete('/category/remove/:categoryId', removeCategory)
router.put('/category/edit/:categoryId/:categoryName', validateAddEditCategory, uploadMiddleware, editCategory)

router.post('/brand/add', addBrand)
router.delete('/brand/remove', removeBrand)
router.put('/brand/edit/:brandId', editBrand)

router.post('/product/add', addProduct)
router.delete('/product/remove', removeProduct)
router.put('/product/edit/:productId', editProduct)


module.exports = router