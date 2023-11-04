const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
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
});

module.exports = Roles;