const {DataTypes} = require("sequelize")
const sequelize = require("../db");

const UserModel = sequelize.define('users', {
    id:{type:DataTypes.NUMBER, primaryKey: true},
    name:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING,unique:true},
    city:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING(40)},
    website:{type:DataTypes.STRING},
    company:{type:DataTypes.STRING}  
},{
    timestamps:false,
})

module.exports={
    UserModel
}
