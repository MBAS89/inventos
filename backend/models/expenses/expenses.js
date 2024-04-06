const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Expenses = sequelize.define('expenses', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stores',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    expenses_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    }
});

module.exports = Expenses;