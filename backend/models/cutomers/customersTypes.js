const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const CustomersTypes = sequelize.define('customers_types', {
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
        defaultValue:"loyal customer"
    },
    discount_value:{
        type: DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:2
    },
    wholeSalePrice:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
});

module.exports = CustomersTypes;