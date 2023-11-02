const express = require('express')
const router = express.Router()

//Supplier controllers
const {  addSupplierType, editSupplierType, removeSupplierType } = require('../controllers/suppliers/suppliersTypes')
const { addSupplier, editSupplier, removeSupplier } = require('../controllers/suppliers/suppliers')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//Supplier validatitor middleware
const ValidateAddEditRemoveSuppliersType = require('../middleware/validations/suppliers/ValidateAddEditRemoveSuppliersType')
const ValidateSuppliersName = require('../middleware/validations/suppliers/ValidateSuppliersName')

//Routes

//Supplier routes
router.post('/add', ValidateSuppliersName, uploadMiddleware, addSupplier)
router.put('/edit/:supplierId', ValidateSuppliersName, uploadMiddleware, editSupplier)
router.delete('/remove/:supplierId', ValidateSuppliersName, removeSupplier)


//Supplier types routes
router.post('/types/add', ValidateAddEditRemoveSuppliersType,  addSupplierType)
router.put('/types/edit/:typeId', ValidateAddEditRemoveSuppliersType, editSupplierType)
router.delete('/types/remove/:typeId', ValidateAddEditRemoveSuppliersType, removeSupplierType)



module.exports = router