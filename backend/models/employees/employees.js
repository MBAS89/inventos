const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Employees = sequelize.define('employees', {
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
    image:{
        type: DataTypes.TEXT,
        defaultValue:"https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png",
    },
    image_id:{
        type: DataTypes.TEXT,
        defaultValue: "i03qtxih8xzvprfsl2z7"
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
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
    status: {
        type: DataTypes.ENUM('on-payroll', 'out-payroll'),
        defaultValue:'on-payroll'
    },
    employment_date:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    end_of_service:{
        type:DataTypes.DATE,
    },
    work_type: {
        type: DataTypes.ENUM('full-time', 'part-time', 'temporary', 'remote', 'hybrid', 'contract-based', 'not-installed'),
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
    hourly_rate: DataTypes.DECIMAL,
    yearly_salary: DataTypes.DECIMAL,
    monthly_salary:DataTypes.DECIMAL
});

module.exports = Employees;