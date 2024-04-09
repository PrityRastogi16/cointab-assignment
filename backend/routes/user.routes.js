const express = require("express");
const {UserModel} = require("../models/user.model");
const userRouter = express.Router();
const axios = require("axios");

userRouter.post("/add", async(req,res)=>{
    try{
       let {id,name,email,city,phone,website,company} = req.body
       const user = await UserModel.create({
        id:id, name:name, email:email, city:city, phone:phone, website:website, company:company
       })
       res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.json({Error:err})
    }

})

// ADD FETCH
userRouter.get("/", async(req,res)=>{
    try{
    let response = await axios("https://jsonplaceholder.typicode.com/users");
    let data = response.data
    let userIds = data.map(user =>user.id);
    let userInDB = await UserModel.findAll({
        where:{id:userIds},
        attributes:['id']
    })
    userInDB = userInDB.map(user=>user.id);
    data = data.map(user=>{
        if(userInDB.includes(user.id)){
            user.isPresent = true;
        }else{
            user.isPresent = false;
        }
        return user;
    })
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.json({Error:err})
    }
})

module.exports = {userRouter}