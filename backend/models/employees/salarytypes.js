const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SalaryTypes  = sequelize.define('salary_types', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type: DataTypes.STRING
});

module.exports = SalaryTypes ;

