const express = require('express')
const router = express.Router()

//store controllers
const {  createStore, storeLogin, storelogout } = require('../controllers/stores')

//custom store validatitor middleware
const validateCreateStore = require('../middleware/validations/stores/validateStore')

//routes
router.post('/create', validateCreateStore, createStore)
router.post('/auth/login', storeLogin)
router.get('/auth/logout', storelogout)


module.exports = router