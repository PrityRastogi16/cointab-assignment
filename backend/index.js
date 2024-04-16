const express = require("express")
const sequelize = require("./db");
const cors = require("cors");
const {userRouter} = require("./routes/user.routes");
const {PostRouter} = require("./routes/post.route")
const swaggerUI= require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const app = express();
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Cointab Assignment",
            version:"1.0.0",
        },
        servers:[
            {url:"http://localhost:2002"},
            {url:"https://cointab-assignment-kko4.onrender.com"},
            
        ]
    },
    apis:[
        "./routes/*.js"
    ]

}
const openAPI = swaggerJsDoc(options);
app.use("/swagger",swaggerUI.serve,swaggerUI.setup(openAPI));

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Working fine")
})
app.use("/user", userRouter)
app.use("/post", PostRouter)

app.listen(2002,async()=>{
    try {
        console.log("gdfgfg")
        await sequelize.authenticate();
        console.log("Connected to DB")
        console.log("Server is running on port 2002")
    } catch (error) {
        console.log(error)
    }
    
})