const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Employees = require('../employees/employees');
const Customers = require('../cutomers/cutomers');
const Products = require('../inventory/products');

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
    customerId: {
        type: DataTypes.BIGINT,
        allowNull: true, 
        references: {
            model: 'customers',
            key: 'id'
        },
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

InvoiceItems.belongsTo(Products, { foreignKey: 'product_id' });
Invoices.hasMany(InvoiceItems, { as: 'items' , foreignKey: 'invoiceId', onDelete: 'CASCADE' });
InvoiceItems.belongsTo(Invoices);
Invoices.belongsTo(Employees, { foreignKey: 'employeeId' });
Invoices.belongsTo(Customers, { foreignKey: 'customerId' });

module.exports = { Invoices, InvoiceItems };