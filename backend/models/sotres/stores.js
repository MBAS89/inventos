const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Stores = sequelize.define('stores', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  store_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50],
    },
  },
  owner_first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  owner_last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  owner_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  store_image: {
    type: DataTypes.STRING(255),
    defaultValue: 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1713377735/xvxfxqqyhhvv01dohulz.png',
  },   
  store_image_id: {
    type: DataTypes.STRING(255),
    defaultValue: 'id',
  },  
});

module.exports = Stores;