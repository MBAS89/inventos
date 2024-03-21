const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Employees = require('../employees/employees');
const Customers = require('../cutomers/cutomers');
const Products = require('../inventory/products');
const Suppliers = require('../suppliers/suppliers');

const OuterInvoices = sequelize.define('outer_invoices', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    extra_discount: {
        type: DataTypes.FLOAT,
        defaultValue : 0
    },
    total_to_pay: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_due: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
    },
    total_paid: {
        type: DataTypes.FLOAT,
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
    employeeId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'id'
        },
    },
    suppliersId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'suppliers',
            key: 'id'
        },
    },
});


const OuterInvoiceItems = sequelize.define('outer_invoice_items',  {
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

OuterInvoiceItems.belongsTo(Products, { foreignKey: 'product_id' });
OuterInvoices.hasMany(OuterInvoiceItems, { as: 'items' , foreignKey: 'invoiceId', onDelete: 'CASCADE' });
OuterInvoiceItems.belongsTo(OuterInvoices);
OuterInvoices.belongsTo(Employees, { foreignKey: 'employeeId' });
OuterInvoices.belongsTo(Suppliers, { foreignKey: 'suppliersId' });

module.exports = { OuterInvoices, OuterInvoiceItems };