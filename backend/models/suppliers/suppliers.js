const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Suppliers = sequelize.define('suppliers', {
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
    supplier_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    image:{
        type: DataTypes.TEXT,
        defaultValue:"https://res.cloudinary.com/dagzd3ntq/image/upload/v1706469288/r0vdkvx4kao9dgeacvpl.png",
    },
    image_id:{
        type: DataTypes.TEXT,
        defaultValue: "r0vdkvx4kao9dgeacvpl"
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    total_transactions: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },	
    total_debt_for: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },	
    total_debt_us: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
});

module.exports = Suppliers;