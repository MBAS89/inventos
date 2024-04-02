const express = require('express')
const router = express.Router()

const { readBrandsAndCategories, readSingleBrandAndCategory } = require('../controllers/casher')
const Auth = require('../middleware/auth/authMiddleware')


//routes
router.get('/read', Auth, readBrandsAndCategories)
router.get('/search', Auth, readSingleBrandAndCategory)


module.exports = router