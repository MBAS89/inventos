const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Invoices = sequelize.define('invoices', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    items_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue : 0
    },
    extra_discount: {
        type: DataTypes.FLOAT,
        defaultValue : 0
    },
    total_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue : 0
    },
    total_to_pay: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    total_due: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: true,
    },
    total_paid: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    store_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stores',
            key: 'id'
        },
    },
});


const InvoiceItems = sequelize.define('invoice_items',  {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'product_id'
        },
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
});

Invoices.hasMany(InvoiceItems, { as: 'items' , foreignKey: 'invoiceId', onDelete: 'CASCADE' });
InvoiceItems.belongsTo(Invoices);

module.exports = { Invoices, InvoiceItems };