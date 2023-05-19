const mongoose=require("mongoose");
const objectId= mongoose.Schema.Types.ObjectId
const bloggSchema=new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:objectId,
        ref:"firstAuthor"
    },
    tags:[ String],
    category:{
        type:String,
        required:true
    },
    subcategory:[Object],
    deletedAt:{
        type:Date
    
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:Date
        
    },
    isPublished :{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports=mongoose.model("blogg",bloggSchema);
