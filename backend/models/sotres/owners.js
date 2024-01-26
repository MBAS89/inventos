const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Owners = sequelize.define('owners', {
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
            model: 'stores', // Make sure this matches the model name for stores
            key: 'id'
        },
        onDelete: 'CASCADE',
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