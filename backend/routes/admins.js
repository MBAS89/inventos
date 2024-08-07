const express = require('express')
const router = express.Router()

//store controllers
const {  addAdmin, removeAdmin, editAdmin, loginAdmin, logoutAdmin, fetchAllAdmins, readSingleAdmin } = require('../controllers/admins')


//custom admin validatitors middleware
const validateAddAdmin = require('../middleware/validations/admins/validateAddAdmin')
const validateEditAdmin = require('../middleware/validations/admins/validateEditAdmin')
const AuthAdmin = require('../middleware/auth/authAdminMiddleware')

//routes
router.get('/read', fetchAllAdmins)
router.get('/read-single', readSingleAdmin)
router.post('/add', AuthAdmin, validateAddAdmin, addAdmin)
router.put('/edit', AuthAdmin, validateEditAdmin, editAdmin)
router.delete('/remove', AuthAdmin, removeAdmin)
router.post('/login', loginAdmin)
router.get('/logout', logoutAdmin)

module.exports = router