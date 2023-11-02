const express = require('express')
const router = express.Router()

//store controllers
const {  createInvoice, editInvoice, removeInvoice } = require('../controllers/sales')


//custom store validatitor middleware
const validateCreateAndEditInvoice = require('../middleware/validations/sales/validateCreateAndEditInvoice')
const validateDeleteAndEditInvoice = require('../middleware/validations/sales/validateDeleteAndEditInvoice')

//routes
router.post('/invoices/create', validateCreateAndEditInvoice,  createInvoice)
router.put('/invoices/edit/:invoiceId', validateDeleteAndEditInvoice, validateCreateAndEditInvoice,  editInvoice)
router.delete('/invoices/remove/:invoiceId', validateDeleteAndEditInvoice, removeInvoice)

module.exports = router