const express = require('express')
const { createPlan, removePlan, editPlan } = require('../controllers/plans')

const router = express.Router()

//plans Controllers 


//routes
router.post('/add', createPlan)
router.delete('/remove', removePlan)
router.put('/edit', editPlan)

module.exports = router