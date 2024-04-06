const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ExpensesTypes = sequelize.define('expenses_types', {
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
    type_name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    }
});

module.exports = ExpensesTypes;