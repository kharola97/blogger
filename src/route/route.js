const express=require("express");
const router=express.Router();
const authorController=require("../controllers/authourController");
const blogController=require('../controllers/bloggController')
const middleWare=require("../middleware/middleware")
const {fork} = require("child_process")

router.post("/authors",authorController.createAuthor);
//=========================================================
router.post('/blogs', blogController.createBlog);
//====================================================================
router.get("/blogs",middleWare.auth,blogController.getBlogs);
//========================================================================
router.put("/blogs/:blogId",middleWare.auth,middleWare.authorisation,blogController.updateBlog);
//====================================================================================================
router.delete("/blogs/:blogId",middleWare.auth,middleWare.authorisation,blogController.deletById);
//======================================================================================================
router.delete("/blogs",middleWare.auth,middleWare.authorisation,blogController.deleteQuery);
//==========================================================================================================

router.post("/login",authorController.login);


router.get('/three', (req,res)=>{
    const child = fork("./load.js")
    child.send("start")
    child.on('message', (sum)=>{
        res.send({sum:sum})
    })
})




module.exports=router
