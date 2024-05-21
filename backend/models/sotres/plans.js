const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Plans = sequelize.define('plans', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    customers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    suppliers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categories:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brands:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    products:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employees:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expenses:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inner_invoices:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    outer_invoices:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    on_sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    sale_price: {
        type: DataTypes.FLOAT,
    }
  });
  
  module.exports = Plans;