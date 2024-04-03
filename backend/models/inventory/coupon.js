const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Coupon = sequelize.define('coupon', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705620919/d67opvq7mqx2i5qqcn5f.png',
    },
    expires_in:{
        type: DataTypes.DATE,
        allowNull:true
    },
    used:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    usedDate:{
        type: DataTypes.DATE,
        allowNull:true
    },
    kind: {
        type: DataTypes.ENUM('percent', 'cash'),
        defaultValue:'percent'
    },
    value:{
        type: DataTypes.FLOAT,
        defaultValue:0,
        allowNull:false
    },
    can_be_used_times:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    store_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stores',
            key: 'id'
        },
    },
});

module.exports = Coupon;