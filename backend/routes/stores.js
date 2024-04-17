const express = require('express')
const router = express.Router()

//store controllers
const {  createStore, storeLogin, storelogout, fetchAllStores, createStoreDash, editStoreDash, readSingleStore } = require('../controllers/stores')

//custom store validatitor middleware
const validateCreateStore = require('../middleware/validations/stores/validateStore')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')


//routes
router.get('/read', fetchAllStores)
router.get('/read-single', readSingleStore)
router.post('/create', validateCreateStore, createStore)
router.post('/create-dash', uploadMiddleware, createStoreDash)
router.put('/edit', uploadMiddleware,  editStoreDash)
router.post('/auth/login', storeLogin)
router.get('/auth/logout', storelogout)


module.exports = router