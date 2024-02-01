const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});



module.exports = sequelize;