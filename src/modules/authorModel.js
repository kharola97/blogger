const mongoose=require("mongoose");
const validator=require("mongoose-type-email");
const authorSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["Mr", "Mrs", "Miss"],
        required:true
    },
    email:{
        type:validator,
        required:true,
        unique:true
    
    },
    password:{
        type:String,
        required:true
    }
 });

 module.exports=mongoose.model("firstAuthor",authorSchema)



// { fname: { mandatory}, 
// lname: {mandatory}, 
// title: {mandatory, enum[Mr, Mrs, Miss]}, 
// email: {mandatory, valid email, unique}, password: {mandatory} }
