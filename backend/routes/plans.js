const express = require('express')
const { createPlan, removePlan } = require('../controllers/plans')

const router = express.Router()

//plans Controllers 


//routes
router.post('/add', createPlan)
router.delete('/remove', removePlan)

module.exports = router