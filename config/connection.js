// config/connection.js

const Sequelize = require('sequelize');

require('dotenv').config();

// Create a new Sequelize instance and connect to the database
const sequelize = process.env.JAWSDB_URL ? 
  new Sequelize(process.env.JAWSDB_URL) :
  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

module.exports = sequelize;
