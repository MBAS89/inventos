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
    unit:{
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    unit_catergory:{
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    unit_value:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    cost_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    retail_price_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    wholesale_price_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pieces_per_unit:{
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
    unit_of_measurement:{
        type: DataTypes.ARRAY(DataTypes.JSONB),
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