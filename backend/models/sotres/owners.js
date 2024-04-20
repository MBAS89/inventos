const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Owners = sequelize.define('owners', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
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
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

module.exports = Owners;