const express = require('express')
const router = express.Router()

//store controllers
const {  addAdmin, removeAdmin } = require('../controllers/admins')


//custom admin validatitors middleware
const validateAddAdmin = require('../middleware/validations/admins/validateAddAdmin')

//routes
router.post('/add', validateAddAdmin, addAdmin)
router.delete('/remove/:storeId', removeAdmin)

module.exports = router