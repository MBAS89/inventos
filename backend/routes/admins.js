const express = require('express')
const router = express.Router()

//store controllers
const {  addAdmin } = require('../controllers/admins')


//custom admin validatitors middleware
const validateAddAdmin = require('../utils/validations/admins/validateAddAdmin')

//routes
router.post('/add', validateAddAdmin, addAdmin)

module.exports = router