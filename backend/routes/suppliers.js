const express = require('express')
const router = express.Router()

//Supplier controllers
const {  addSupplierType, editSupplierType, removeSupplierType, readSupplierTypes } = require('../controllers/suppliers/suppliersTypes')
const { addSupplier, editSupplier, removeSupplier, getSuppliers, getSingleSuppliers } = require('../controllers/suppliers/suppliers')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')

//Supplier validatitor middleware
const ValidateAddEditRemoveSuppliersType = require('../middleware/validations/suppliers/ValidateAddEditRemoveSuppliersType')
const ValidateSuppliersName = require('../middleware/validations/suppliers/ValidateSuppliersName')
const AUTH = require('../middleware/auth/authMiddleware')

//Routes
//Supplier routes
router.get('/read', AUTH, getSuppliers)
router.get('/read/single', AUTH, getSingleSuppliers)
router.post('/add', AUTH, ValidateSuppliersName, uploadMiddleware, addSupplier)
router.put('/edit/:supplierId', AUTH, ValidateSuppliersName, uploadMiddleware, editSupplier)
router.delete('/remove/:supplierId', AUTH, ValidateSuppliersName, removeSupplier)


//Supplier types routes
router.get('/types/read', AUTH, readSupplierTypes)
router.post('/types/add', AUTH, ValidateAddEditRemoveSuppliersType,  addSupplierType)
router.put('/types/edit/:typeId', AUTH, ValidateAddEditRemoveSuppliersType, editSupplierType)
router.delete('/types/remove/:typeId', AUTH, ValidateAddEditRemoveSuppliersType, removeSupplierType)



module.exports = router