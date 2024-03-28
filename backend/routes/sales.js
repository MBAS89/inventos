const express = require('express')
const router = express.Router()

//store controllers
const {  createInvoice, editInvoice, removeInvoice, readInvoices, readSingleInvoice, addInvoiceHelper, casherProductSearch } = require('../controllers/sales')


//custom store validatitor middleware
const validateCreateAndEditInvoice = require('../middleware/validations/sales/validateCreateAndEditInvoice')
const validateDeleteAndEditInvoice = require('../middleware/validations/sales/validateDeleteAndEditInvoice')
const Auth = require('../middleware/auth/authMiddleware')
const { createOuterInvoice, addOuterInvoiceHelper, readSingleOuterInvoice, readOuterInvoices, removeOuterInvoice, editOuterInvoice } = require('../controllers/outerInvoices')
const validateDeleteAndEditOuterInvoice = require('../middleware/validations/sales/validateDeleteAndEditOuterInvoice')


//routes
router.get('/invoices/read', Auth, readInvoices)
router.get('/invoices/read-snigle', Auth, readSingleInvoice)
router.get('/invoices/helper', Auth, addInvoiceHelper)
router.get('/invoices/casher/search', Auth, casherProductSearch)
router.post('/invoices/create', Auth, validateCreateAndEditInvoice,  createInvoice)
router.put('/invoices/edit/:invoiceId', Auth, validateDeleteAndEditInvoice, validateCreateAndEditInvoice,  editInvoice)
router.delete('/invoices/remove/:invoiceId', Auth, validateDeleteAndEditInvoice, removeInvoice)

router.get('/outer-invoices/read', Auth, readOuterInvoices)
router.post('/outer-invoices/create', Auth, createOuterInvoice)
router.get('/outer-invoices/helper', Auth, addOuterInvoiceHelper)
router.get('/outer-invoices/read-snigle', Auth, readSingleOuterInvoice)
router.put('/outer-invoices/edit', Auth, editOuterInvoice)
router.delete('/outer-invoices/remove/:invoiceId', Auth, validateDeleteAndEditOuterInvoice, removeOuterInvoice)

module.exports = router