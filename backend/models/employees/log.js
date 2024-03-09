const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Log = sequelize.define('log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    signInTime:{
        type:DataTypes.DATE,
        allowNull: false
    },
    signoutTime:{
        type:DataTypes.DATE
    },
    accountedFor:{
        type:DataTypes.BOOLEAN,
    }
});

module.exports = Log;