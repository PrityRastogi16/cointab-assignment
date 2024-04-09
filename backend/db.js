const {Sequelize} = require("sequelize")
require("dotenv").config()
const sequelize = new Sequelize({
    host:"127.0.0.1",
    username: "root",
    password: "#Prity16072002",
    database:"cointab",
    dialect:"mysql",
})


module.exports = sequelize;