const express = require('express')
const { createPlan } = require('../controllers/plans')

const router = express.Router()

//plans Controllers 


//routes
router.post('/add', createPlan)


module.exports = router