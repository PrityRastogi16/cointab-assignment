const express = require("express")
const sequelize = require("./db");
const cors = require("cors");
const {userRouter} = require("./routes/user.routes");



const app = express();
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Working fine")
})
app.use("/user", userRouter)


app.listen(2002,async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connected to DB")
        console.log("Server is running on port 2002")
    } catch (error) {
        console.log(error)
    }
    
})