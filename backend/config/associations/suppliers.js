const Suppliers = require("../../models/suppliers/suppliers");
const SuppliersTypes = require("../../models/suppliers/suppliersType");

Suppliers.belongsTo(SuppliersTypes, { foreignKey: 'supplier_type_id' });
SuppliersTypes.hasMany(Suppliers, { foreignKey: 'supplier_type_id' });

// Export models
module.exports = {
    Suppliers,
    SuppliersTypes
};
