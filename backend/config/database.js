const Sequelize = require('sequelize');

const sequelize = new Sequelize('roughapp', 'root', 'root', {
    host: '127.0.0.1',
    port: '3308',
    dialect: 'mysql'
  });
  
module.exports = sequelize;