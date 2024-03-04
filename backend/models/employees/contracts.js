const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Contracts = sequelize.define('contracts', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    salary_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'salary_types',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('Active', 'Finshed', 'Canceled'),
        defaultValue:'Active'
    },
    hourly_rate: DataTypes.DECIMAL,
    yearly_salary: DataTypes.DECIMAL,
    monthly_salary:DataTypes.DECIMAL,
    details: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
});

module.exports = Contracts;

