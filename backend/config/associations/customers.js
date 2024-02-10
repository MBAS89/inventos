const CustomersTypes = require("../../models/cutomers/customersTypes");
const Customers = require("../../models/cutomers/cutomers");

Customers.belongsTo(CustomersTypes, { foreignKey: 'cutomer_type', as: 'customerType' });

// Export models
module.exports = {
    Customers
};

