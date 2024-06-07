const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('paid', 'due', 'canceled', 'failed'),
        allowNull: false,
        defaultValue:'due'
    },
    claimed:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    paidDate:{
        type:DataTypes.DATE,
        allowNull: true
    },
    paymentDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
    hoursWorked: DataTypes.FLOAT,
});

module.exports = Payment;