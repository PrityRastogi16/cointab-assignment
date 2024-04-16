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



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID.
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         city:
 *           type: string
 *           description: The user's city.
 *         phone:
 *           type: string
 *           description: The user's phone number.
 *         website:
 *           type: string
 *           description: The user's website.
 *         company:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The company's name.
 *             catchPhrase:
 *               type: string
 *               description: The company's catchphrase.
 *             bs:
 *               type: string
 *               description: The company's business strategy.
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john.doe@example.com
 *         city: New York
 *         phone: 123-456-7890
 *         website: example.com
 *         company:
 *           name: Company ABC
 *           catchPhrase: Lorem ipsum dolor sit amet
 *           bs: Lorem ipsum
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users with presence indicator
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: List of users with presence indicator
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */


module.exports = {userRouter}