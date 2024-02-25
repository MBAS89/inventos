const express = require('express')
const router = express.Router()

//customers controllers
const {  addCustomerType, editCustomerType, removeCustomerType, getCustomerTypes } = require('../controllers/customers/customersTypes')
const { addCustomer, editCustomer, removeCustomer, getCustomers, getSingleCustomer } = require('../controllers/customers/customers')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//custom store validatitor middleware
const ValidateAddEditRemoveCustomerType = require('../middleware/validations/customers/ValidateAddEditRemoveCustomerType')
const ValidateCustomerName = require('../middleware/validations/customers/ValidateCustomerName')
const Auth = require('../middleware/auth/authMiddleware')




//Routes
//customers types routes
router.get('/types/get', getCustomerTypes)
router.post('/types/add', ValidateAddEditRemoveCustomerType,  addCustomerType)
router.put('/types/edit/:typeId', ValidateAddEditRemoveCustomerType, editCustomerType)
router.delete('/types/remove/:typeId', ValidateAddEditRemoveCustomerType, removeCustomerType)

//customers routes
router.get('/read/single', getSingleCustomer)
router.get('/read', getCustomers)
router.post('/add', Auth, ValidateCustomerName, uploadMiddleware, addCustomer)
router.put('/edit/:customerId', Auth, ValidateCustomerName, uploadMiddleware, editCustomer)
router.delete('/remove/:customerId', removeCustomer)

module.exports = router