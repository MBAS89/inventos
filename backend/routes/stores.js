const express = require('express')
const router = express.Router()

//store controllers
const {  createStore } = require('../controllers/stores')

//custom store validatitor middleware
const validateCreateStore = require('../middleware/validations/stores/validateStore')

//routes
router.post('/create', validateCreateStore, createStore)

module.exports = router