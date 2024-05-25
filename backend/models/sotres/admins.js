const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Admins = sequelize.define('admins', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    super:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
});

module.exports = Admins;