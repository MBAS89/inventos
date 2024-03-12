const Brands = require("../../models/inventory/brands");
const Categories = require("../../models/inventory/categories");
const Products = require("../../models/inventory/products");
const { InvoiceItems } = require("../../models/sales/invoices");

Products.belongsTo(Categories, { foreignKey: 'category_id' });
Categories.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Brands, { foreignKey: 'brand_id' });
Brands.hasMany(Products, { foreignKey: 'brand_id' });
Products.hasMany(InvoiceItems, { foreignKey: 'product_id' });
// Export models
module.exports = {
    Categories,
    Products,
    Brands
};

