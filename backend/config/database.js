const Sequelize = require('sequelize');

// Connection details
const hostname = "4et.h.filess.io";
const database = "roughApp_originalas";
const port = "3307";
const username = "roughApp_originalas";
const password = process.env.NEXT_PRIVATE_DB_PASSWORD;

// Create a Sequelize instance with the new connection details
const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  port: port,
  dialect: 'mysql',
  dialectModule: require('mysql2') // Explicitly require 'mysql2'
});

module.exports = sequelize;
