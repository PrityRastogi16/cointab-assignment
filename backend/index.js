const express = require("express")
const sequelize = require("./db");



const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Working fine")
})



app.listen(2002,async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connected to DB")
        console.log("Server is running on port 2002")
    } catch (error) {
        console.log(error)
    }
    
})