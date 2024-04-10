const express = require("express");
const {postModel} = require("../models/post.model")
const axios = require("axios");
const Excel = require("exceljs");

const PostRouter = express.Router();

PostRouter.post("/",async(req,res)=>{
    try{
        const newPost = await postModel.bulkCreate(req.body);
        console.log(newPost)
        res.status(201).json(newPost);
    }catch(err) {
        console.log(err);
        res.json({error: "Error while creating post"});
    }

})


// FETCH DATA
PostRouter.get("/", async(req,res)=>{
    try{
     let {userId} = req.query;
     console.log(userId)
     let posts = await postModel.findAll({where:{userId}});
     let response = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
     response=response.data
     if(posts.length > 0){
        return  res.status(200).json({hasPosts:true,response})
     }else{
     return res.status(200).json({hasPosts:false,response});
     }
    }
    catch(err){
        console.log(err);
        res.json({error: "Error while fetching post"});
    }
    
})


PostRouter.get("/download-excel/:userId", async(req,res)=>{
    try{
       const {userId} = req.params;
       console.log(userId)
       const posts = await postModel.findAll({where:{userId}});
       const workbook = new Excel.Workbook();
       const worksheet = workbook.addWorksheet("Posts");
       worksheet.columns=[
        { header: "ID", key: "id", width: 10 },
        { header: "User ID", key: "userId", width: 15 },
        { header: "Title", key: "title", width: 50 },
        { header: "Body", key: "body", width: 150 }
       ]
       posts.forEach(post=>{
        worksheet.addRow({
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body
        })
       })
       res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
       res.setHeader("Content-Disposition", `attachment; filename="posts_${userId}.xlsx"`);
       await workbook.xlsx.write(res);
       res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to download Excel" });
    }
})

module.exports = {
    PostRouter
}