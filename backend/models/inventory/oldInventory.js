const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Products = require('./products');

const OldInventory = sequelize.define('old_inventory', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('sell-on-old-price', 'sell-on-new-price','sell-this-on-old-price'),
        defaultValue:'sell-this-on-old-price',
        allowNull: false,
    },
    cost_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    retail_price_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pieces_per_unit:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue:1
    },
    wholesale_price_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cost_piece:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    retail_price_piece:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    wholesale_price_piece:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sale_price_unit: {
        type: DataTypes.FLOAT,
    },
    sale_price_piece: {
        type: DataTypes.FLOAT,
    },
    on_sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    store_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stores', 
            key: 'id'
        },
    },
});

Products.hasMany(OldInventory, { foreignKey: 'product_id' });
OldInventory.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = OldInventory;