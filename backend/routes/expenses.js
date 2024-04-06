const express = require('express')
const router = express.Router()

//Expenses controllers
const { addExpense, getExpenses, getSingleExpense, editExpense, removeExpense } = require('../controllers/expenses/expenses')
const { readExpensesTypes, addExpenseType, editExpenseType, removeExpenseType } = require('../controllers/expenses/expensesTypes')

//Expenses validatitor middleware
const ValidateAddEditRemoveExpensesType = require('../middleware/validations/expenses/ValidateAddEditRemoveExpensesType')
const ValidateExpensesName = require('../middleware/validations/expenses/ValidateExpensesName')

//Auth Middleware
const AUTH = require('../middleware/auth/authMiddleware')



//Routes
//Expenses routes
router.get('/read', AUTH, getExpenses)
router.get('/read/single', AUTH, getSingleExpense)
router.post('/add', AUTH, ValidateExpensesName, addExpense)
router.put('/edit', AUTH, editExpense)
router.delete('/remove', AUTH, removeExpense)


//Expenses types routes
router.get('/types/read', AUTH, readExpensesTypes)
router.post('/types/add', AUTH, ValidateAddEditRemoveExpensesType,  addExpenseType)
router.put('/types/edit', AUTH, ValidateAddEditRemoveExpensesType, editExpenseType)
router.delete('/types/remove', AUTH, ValidateAddEditRemoveExpensesType, removeExpenseType)

module.exports = router