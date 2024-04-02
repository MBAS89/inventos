const express = require('express')
const router = express.Router()

//validations middlewares
const validateAddEditCategory = require('../middleware/validations/inventory/validateAddEditCategory')
const validateAddEditBrand = require('../middleware/validations/inventory/validateAddEditBrand')
const validateAddEditProduct = require('../middleware/validations/inventory/validateAddEditProduct')

//upload to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//inventory  controllers
const { addCategory, removeCategory, editCategory, addBrand, removeBrand, editBrand, addProduct, removeProduct, editProduct, readSingleCategory, readCategories, readSingleBrand, readBrands, readSingleProduct, readProducts, readBrandsAndCategories, generateSku } = require('../controllers/inventory')
const Auth = require('../middleware/auth/authMiddleware')
const { addCoupon, editCoupon, removeCoupon, checkCoupon, readCoupons } = require('../controllers/coupon')


//inventory routes
router.get('/category/read/single', Auth, readSingleCategory)
router.get('/category/read', Auth, readCategories)
router.post('/category/add/:categoryName', Auth, validateAddEditCategory, uploadMiddleware, addCategory)
router.delete('/category/remove/:categoryId', Auth, removeCategory)
router.put('/category/edit/:categoryId/:categoryName', Auth, validateAddEditCategory, uploadMiddleware, editCategory)

router.get('/brand/read/single', Auth, readSingleBrand)
router.get('/brand/read', Auth, readBrands)
router.post('/brand/add/:brandName', Auth, validateAddEditBrand, uploadMiddleware, addBrand)
router.delete('/brand/remove/:brandId', Auth, removeBrand)
router.put('/brand/edit/:brandId/:brandName', Auth, validateAddEditBrand, uploadMiddleware, editBrand)

router.get('/product/generate-sku', Auth, generateSku)
router.get('/product/read/brands-categories', Auth, readBrandsAndCategories)
router.get('/product/read/single', Auth, readSingleProduct)
router.get('/product/read', Auth, readProducts)
router.post('/product/add/:productName', Auth, validateAddEditProduct, uploadMiddleware, addProduct)
router.delete('/product/remove/:productId', Auth, removeProduct)
router.put('/product/edit/:productId/:productName', Auth, validateAddEditProduct, uploadMiddleware, editProduct)

//Coupons Routes
router.get('/coupon/read', Auth, readCoupons)
router.get('/coupon/read/signle', Auth, checkCoupon)
router.post('/coupon/add', Auth, addCoupon)
router.put('/coupon/edit', Auth, editCoupon)
router.delete('/coupon/remove', Auth, removeCoupon)


module.exports = router