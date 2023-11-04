const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Contracts = sequelize.define('contracts', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    details: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
});

module.exports = Contracts;

