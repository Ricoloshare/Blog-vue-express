const Sequelize = require('sequelize');
const MYSQL_CONFIG = require('../config/db');

const sequelize = new Sequelize(MYSQL_CONFIG.databaseName, 
                                MYSQL_CONFIG.databaseUserName,
                                MYSQL_CONFIG.databasePassword, 
                                MYSQL_CONFIG.conf);

module.exports = sequelize;

