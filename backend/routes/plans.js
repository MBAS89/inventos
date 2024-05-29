const express = require('express')
const { createPlan, removePlan, editPlan, fetchAllPlans, fetchSinglePlans } = require('../controllers/plans')

const router = express.Router()

//plans Controllers 


//routes
router.get('/read', fetchAllPlans)
router.get('/read-single', fetchSinglePlans)
router.post('/add', createPlan)
router.delete('/remove', removePlan)
router.put('/edit', editPlan)

module.exports = router