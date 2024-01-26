const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Products = sequelize.define('products', {
    product_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705621314/fekyljmwjkrvrauqbrgh.png',
    },
    image_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'fekyljmwjkrvrauqbrgh',
    },
    sku: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    retail_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    wholesale_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.DECIMAL,
    },
    on_sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories', 
            key: 'category_id'
        },
    },
    brand_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'brands', 
            key: 'brand_id'
        },
    },
    store_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stores', 
            key: 'id'
        },
    },
});

module.exports = Products;