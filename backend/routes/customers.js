const express = require('express')
const router = express.Router()

//customers controllers
const {  addCustomerType, editCustomerType, removeCustomerType } = require('../controllers/customers/customersTypes')
const { addCustomer, editCustomer, removeCustomer } = require('../controllers/customers/customers')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//custom store validatitor middleware
const ValidateAddEditRemoveCustomerType = require('../middleware/validations/customers/ValidateAddEditRemoveCustomerType')
const ValidateCustomerName = require('../middleware/validations/customers/ValidateCustomerName')



//Routes
//customers types routes
router.post('/types/add', ValidateAddEditRemoveCustomerType,  addCustomerType)
router.put('/types/edit/:typeId', ValidateAddEditRemoveCustomerType, editCustomerType)
router.delete('/types/remove/:typeId', ValidateAddEditRemoveCustomerType, removeCustomerType)

//customers routes
router.post('/add', ValidateCustomerName, uploadMiddleware, addCustomer)
router.put('/edit/:customerId', ValidateCustomerName, uploadMiddleware, editCustomer)
router.delete('/remove/:customerId', removeCustomer)

module.exports = router