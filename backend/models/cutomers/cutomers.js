const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Customers = sequelize.define('customers', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stores',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    image:{
        type: DataTypes.TEXT,
        defaultValue:"https://res.cloudinary.com/dagzd3ntq/image/upload/v1706368610/vleb9qfjosfgbndlhmnr.png",
    },
    image_id:{
        type: DataTypes.TEXT,
        defaultValue: "vleb9qfjosfgbndlhmnr"
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    total_transactions: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },	
    total_debt: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },	
    total_paid: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    cutomer_type:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers_types',
            key: 'id'
        },
        onDelete: 'CASCADE',
    }	

});

module.exports = Customers;