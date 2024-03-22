const express = require('express')
const router = express.Router()

//store controllers
const {  createInvoice, editInvoice, removeInvoice, readInvoices, readSingleInvoice, addInvoiceHelper, casherProductSearch } = require('../controllers/sales')


//custom store validatitor middleware
const validateCreateAndEditInvoice = require('../middleware/validations/sales/validateCreateAndEditInvoice')
const validateDeleteAndEditInvoice = require('../middleware/validations/sales/validateDeleteAndEditInvoice')
const Auth = require('../middleware/auth/authMiddleware')
const { createOuterInvoice, addOuterInvoiceHelper } = require('../controllers/outerInvoices')

//routes
router.get('/invoices/read', Auth, readInvoices)
router.get('/invoices/read-snigle', Auth, readSingleInvoice)
router.get('/invoices/helper', Auth, addInvoiceHelper)
router.get('/invoices/casher/search', Auth, casherProductSearch)
router.post('/invoices/create', Auth, validateCreateAndEditInvoice,  createInvoice)
router.put('/invoices/edit/:invoiceId', Auth, validateDeleteAndEditInvoice, validateCreateAndEditInvoice,  editInvoice)
router.delete('/invoices/remove/:invoiceId', Auth, validateDeleteAndEditInvoice, removeInvoice)

router.post('/outer-invoices/create', Auth, createOuterInvoice)
router.get('/outer-invoices/helper', Auth, addOuterInvoiceHelper)

module.exports = router