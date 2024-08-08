const express = require('express')
const router = express.Router()

//Analytics controllers

//custom store validatitor middleware
const Auth = require('../middleware/auth/authMiddleware')
const { fetchHomeAnalytics, fetchEmployeesAnalytics, fetchCustomersAnalytics, fetchSuppliersAnalytics, fetchExpensesAnalytics, fetchInventoryAnalytics } = require('../controllers/analytics')

//Routes
router.get('/home', Auth, fetchHomeAnalytics)
router.get('/employees', Auth, fetchEmployeesAnalytics)
router.get('/customers', Auth, fetchCustomersAnalytics)
router.get('/suppliers', Auth, fetchSuppliersAnalytics)
router.get('/expenses-sales', Auth, fetchExpensesAnalytics)
router.get('/inventory', Auth, fetchInventoryAnalytics)

module.exports = router