const jwt = require("jsonwebtoken");
const validator=require("validator");
const author=require("../modules/authorModel");

const createAuthor=async function(req,res){
  try {
   let data=req.body;
   
    if(!data.fname||!data.lname||!data.title||!data.email||!data.password) return res.status(400).send({status:false,message:"please fill all the fields"})

    let fname=data.fname.trim()
    
    let lname=data.lname.trim()
   data.fname=fname;
   data.lname=lname;

    if(!validator.isAlpha(data.fname)||!validator.isAlpha(data.lname))  return res.status(400).send({status:false,message:"invalid name"})
     if(!(["Mr","Mrs","Miss"].includes(data.title)))  return res.status(400).send({status:false,message:"please provide a valid title eg Mr,Mrs,Miss  "}) //-----added new line added
     if(!(validator.isEmail(req.body.email))) return res.status(400).send({status:false,message:"please put a valid email"})
     
     if (!validator.isStrongPassword(data.password)) {
      return res.status(400).send({ status: false, message: "Kindly use atleast one uppercase alphabets, numbers and special characters for strong password." })
}
let checkEmail=await author.findOne({email:data.email})
if(checkEmail) return res.status(400).send({status:false,message:"email already exists"})
     
     let setData=await author.create(data);
    res.status(201).send({status:true,data:setData});
}catch(error){
    res.status(500).send({status:false,message:error.message})
}
}

const login = async(req, res) => {
  try {
      let username = req.body.email
      let password = req.body.password

      if (!username || !password) {
          return res.status(400).send({ status: false, message: "Please Enter email id and password both." })
      }

      let auth = await author.findOne({ email: username }).select({ email: 1, password: 1 })

      if (!auth) {
          return res.status(400).send({ status: false, message: "Please enter correct email." })
      }
      if (password !== auth.password) {
          return res.status(401).send({ status: false, message: "Email Id and password are not matched. Enter the correct password." })
      }

      let token = jwt.sign({ authorId: auth._id.toString(), batch: "californium"},"californium-blog");
      res.setHeader("x-api-key", token)
      res.status(201).send({ status: true, data: token })

  } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports={createAuthor,login};
