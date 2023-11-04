const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Permissions = sequelize.define('permissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Permissions;