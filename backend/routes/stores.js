const express = require('express')
const router = express.Router()

//store controllers
const {  createStore, storeLogin, storelogout, fetchAllStores, createStoreDash, editStoreDash, readSingleStore, deleteStore } = require('../controllers/stores')

//owners controllers
const { fetchAllOwners, readOwner, deleteOwner, editOwner } = require('../controllers/owners')

//custom store validatitor middleware
const validateCreateStore = require('../middleware/validations/stores/validateStore')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')



//routes
router.get('/read', fetchAllStores)
router.get('/read-single', readSingleStore)
router.delete('/remove/:storeId', deleteStore)
router.post('/create', validateCreateStore, createStore)
router.post('/create-dash', uploadMiddleware, createStoreDash)
router.put('/edit', uploadMiddleware,  editStoreDash)
router.post('/auth/login', storeLogin)
router.get('/auth/logout', storelogout)


router.get('/owners/read', fetchAllOwners)
router.get('/owners/read-single', readOwner)
router.delete('/owners/delete', deleteOwner)
router.put('/owners/edit', editOwner)

module.exports = router