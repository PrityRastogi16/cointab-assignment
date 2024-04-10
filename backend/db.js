const {Sequelize} = require("sequelize")
require("dotenv").config()
const sequelize = new Sequelize({
    host: process.env.db_HOST,
    username: process.env.db_USERNAME,
    password: process.env.db_PASSWORD,
    database: process.env.db_DATABASE,
    port:process.env.db_port,
    dialect:process.env.db_DIALECT,
    dialectOptions:{
        connectTimeout:86400
    }
});

module.exports = sequelize;