const { Sequelize } = require("sequelize")
require('dotenv').config()

const connection = new Sequelize(process.env.DATABSE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: "mysql"
});

connection.authenticate()

module.exports = connection