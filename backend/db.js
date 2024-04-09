const {Sequelize} = require("sequelize")
require("dotenv").config()
const sequelize = new Sequelize({
    host: process.env.HOST,
    username: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect:"mysql",
});

module.exports = sequelize;