const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const RolePermissions = sequelize.define('role_permissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = RolePermissions;