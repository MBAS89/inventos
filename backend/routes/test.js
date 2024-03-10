const express = require('express')
const router = express.Router()

//store controllers
const { test } = require('../controllers/test')

//routes
router.get('/', test)


module.exports = router