const CustomersTypes = require("../../models/cutomers/customersTypes");
const Customers = require("../../models/cutomers/cutomers");
const { Invoices } = require("../../models/sales/invoices");

Customers.belongsTo(CustomersTypes, { foreignKey: 'cutomer_type', as: 'customerType' });
Customers.hasMany(Invoices, { foreignKey: 'customerId' });

// Export models
module.exports = {
    Customers
};

