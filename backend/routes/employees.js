const express = require('express')

const router = express.Router()

//SALARY TYPES CONTROLLERS
const { addSalaryTypes, editSalaryTypes, removeSalaryTypes } = require('../controllers/employees/salaryTypes')
//EMPLOYEE CONTROLLERS
const { addEmployee, editEmployee, removeEmployee } = require('../controllers/employees/employee')
//ROLES CONTROLLERS
const { addRole, editRole, removeRole } = require('../controllers/employees/roles')
//DEPARTMENTS CONTROLLERS
const { addDepartment, editDepartment, removeDepartment } = require('../controllers/employees/departments')
//PERMISSIONS CONTROLLERS
const { addPermission, editPermission, removePermission } = require('../controllers/employees/permissions')
//ROLEPERMISSIONS CONTROLLERS
const { addRolePermission, removeRolePermission } = require('../controllers/employees/rolePermissions')


//upload image to cloudinary middleware
const uploadMiddleware = require('../middleware/uploadImageToCloudinary')
//Employee validatitor middleware
const ValidateEmployeesName = require('../middleware/validations/employees/ValidateEmployeesName')
const ValidateRoleName = require('../middleware/validations/employees/ValidateRoleName')

//Routes

//Salary Types Routes
router.post('/salary-types/add', addSalaryTypes)
router.put('/salary-types/edit/:typeId', editSalaryTypes)
router.delete('/salary-types/remove/:typeId', removeSalaryTypes)

//Employees Routes
router.post('/add', ValidateEmployeesName, uploadMiddleware, addEmployee)
router.put('/edit/:employeeId', ValidateEmployeesName, uploadMiddleware, editEmployee)
router.delete('/remove/:employeeId', ValidateEmployeesName, uploadMiddleware, removeEmployee)

//Roles Routes
router.post('/roles/add', ValidateRoleName, addRole)
router.put('/roles/edit/:roleId', ValidateRoleName, editRole)
router.delete('/roles/remove/:roleId', removeRole)

//Departments Routes
router.post('/departments/add', addDepartment)
router.put('/departments/edit/:departmentId', editDepartment)
router.delete('/departments/remove/:departmentId', removeDepartment)

//Permissions Routes
router.post('/permissions/add', addPermission)
router.put('/permissions/edit/:permissionId', editPermission)
router.delete('/permissions/remove/:permissionId', removePermission)

//RolePermissions Routes
router.post('/role-permissions/add', addRolePermission)
router.delete('/role-permissions/remove/:rolePermissionId', removeRolePermission)

module.exports = router