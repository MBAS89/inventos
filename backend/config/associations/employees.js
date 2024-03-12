const Contracts = require('../../models/employees/contracts');
const Departments = require('../../models/employees/department');
const Employees = require('../../models/employees/employees');
const Log = require('../../models/employees/log');
const Payment = require('../../models/employees/payments');
const Permissions = require('../../models/employees/permission');
const RolePermissions = require('../../models/employees/rolePermission');
const Roles = require('../../models/employees/roles');
const SalaryTypes = require('../../models/employees/salarytypes');
const { Invoices } = require('../../models/sales/invoices');


// Define associations
Employees.belongsTo(Roles);
Roles.hasMany(Employees);

Permissions.belongsTo(Departments);
Departments.hasMany(Permissions);

Roles.belongsToMany(Permissions, { through: RolePermissions });
Permissions.belongsToMany(Roles, { through: RolePermissions });

// Establishing relationship between Employee and Contract
Employees.hasOne(Contracts);
Contracts.belongsTo(Employees);

Employees.belongsTo(SalaryTypes, { as: 'salary_type', foreignKey: 'salary_type_id' });
Contracts.belongsTo(SalaryTypes, { as: 'salary_type', foreignKey: 'salary_type_id' });

Employees.hasMany(Log);
Log.belongsTo(Employees);
Employees.hasMany(Payment);
Payment.belongsTo(Employees);

Employees.hasMany(Invoices, { foreignKey: 'employeeId' });

// Export models
module.exports = {
    Contracts,
    Departments,
    Employees,
    Permissions,
    RolePermissions,
    Roles
};

