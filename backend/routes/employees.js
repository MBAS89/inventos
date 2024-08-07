const express = require('express')

const router = express.Router()

//SALARY TYPES CONTROLLERS
const { addSalaryTypes, editSalaryTypes, removeSalaryTypes, readSalaryTypes } = require('../controllers/employees/salaryTypes')
//EMPLOYEE CONTROLLERS
const { addEmployee, editEmployee, removeEmployee, readEmployees, readSingleEmployee, editEmployeeRole, editEmployeeJobDetails, editEmployeeSalary, editEmployeeWorkingStatus, editEmployeePaidType } = require('../controllers/employees/employee')
//ROLES CONTROLLERS
const { addRole, editRole, removeRole, readRoles, readRole } = require('../controllers/employees/roles')
//DEPARTMENTS CONTROLLERS
const { addDepartment, editDepartment, removeDepartment, readDepartments } = require('../controllers/employees/departments')
//PERMISSIONS CONTROLLERS
const { addPermission, editPermission, removePermission } = require('../controllers/employees/permissions')
//ROLEPERMISSIONS CONTROLLERS
const { addRolePermission, removeRolePermission } = require('../controllers/employees/rolePermissions')
//CONTRACTS CONTROLLERS
const { addContractToEmployee, addContractAndNewEmployee, editContract, removeContract } = require('../controllers/employees/contracts')
//PAYMENTS CONTROLLERS
const { readEmployeePayments, createEmployeePayment, payOrCancelPayment, editPayment, deletePayment, readEmployeePayment } = require('../controllers/employees/payments')

//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')
//Employee validatitor middleware
const ValidateEmployeesName = require('../middleware/validations/employees/ValidateEmployeesName')
const ValidateRoleName = require('../middleware/validations/employees/ValidateRoleName')

//auth middleware
const Auth = require('../middleware/auth/authMiddleware')
const AuthAdmin = require('../middleware/auth/authAdminMiddleware')

//Routes

//Salary Types Routes
router.get('/salary-types/read', Auth, readSalaryTypes)
router.post('/salary-types/add', Auth, addSalaryTypes)
router.put('/salary-types/edit/:typeId', Auth, editSalaryTypes)
router.delete('/salary-types/remove/:typeId', Auth, removeSalaryTypes)

//Employees Routes
router.get('/read', Auth, readEmployees)
router.get('/read/single', Auth, readSingleEmployee)
router.post('/add', Auth, ValidateEmployeesName, uploadMiddleware, addEmployee)
router.put('/edit/:employeeId', Auth, ValidateEmployeesName, uploadMiddleware, editEmployee)
router.delete('/remove/:employeeId', Auth, ValidateEmployeesName, uploadMiddleware, removeEmployee)
router.put('/edit-role', Auth, editEmployeeRole)
router.put('/edit-job-details', Auth, editEmployeeJobDetails)
router.put('/edit-salary', Auth, editEmployeeSalary)
router.put('/edit-status', Auth, editEmployeeWorkingStatus)
router.put('/edit-paid-type', Auth, editEmployeePaidType)

//Roles Routes
router.get('/roles/read/single', Auth, readRole)
router.get('/roles/read', Auth, readRoles)
router.post('/roles/add', Auth, ValidateRoleName, addRole)
router.put('/roles/edit/:roleId', Auth, ValidateRoleName, editRole)
router.delete('/roles/remove/:roleId', Auth, removeRole)

//Departments Routes
router.get('/departments/read', readDepartments)
router.post('/departments/add', AuthAdmin, addDepartment)
router.put('/departments/edit/:departmentId', AuthAdmin, editDepartment)
router.delete('/departments/remove/:departmentId', AuthAdmin, removeDepartment)

//Permissions Routes
router.post('/permissions/add', AuthAdmin, addPermission)
router.put('/permissions/edit/:permissionId', AuthAdmin, editPermission)
router.delete('/permissions/remove/:permissionId', AuthAdmin, removePermission)

//RolePermissions Routes
router.post('/role-permissions/add', Auth, addRolePermission)
router.delete('/role-permissions/remove/:rolePermissionId', Auth, removeRolePermission)

//Contracts Routes
router.post('/contracts/add-to-employee', Auth, addContractToEmployee)
router.post('/contracts/add-employee-contract', Auth, ValidateEmployeesName, uploadMiddleware, addContractAndNewEmployee)
router.put('/contracts/edit/:contractId', Auth, editContract)
router.delete('/contracts/remove/:contractId', Auth, removeContract)

//payments routes 
router.get('/payments/read', Auth, readEmployeePayments)
router.get('/payments/read-single', Auth, readEmployeePayment)
router.post('/payments/add', Auth, createEmployeePayment)
router.put('/payments/pay-or-cancel', Auth, payOrCancelPayment)
router.put('/payments/edit', Auth, editPayment)
router.delete('/payments/remove', Auth, deletePayment)


module.exports = router