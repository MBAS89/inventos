const Brands = require("../../models/inventory/brands");
const Categories = require("../../models/inventory/categories");
const Products = require("../../models/inventory/products");

Products.belongsTo(Categories, { foreignKey: 'category_id' });
Categories.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Brands, { foreignKey: 'brand_id' });
Brands.hasMany(Products, { foreignKey: 'brand_id' });

// Export models
module.exports = {
    Categories,
    Products,
    Brands
};

