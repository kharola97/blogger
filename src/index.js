const express=require('express')

const route=require('./route/route')
const {default:mongoose}=require('mongoose')
const app=express()

app.use(express.json())


mongoose.connect("mongodb+srv://ankitdb:ankit321@cluster0.nz06g9j.mongodb.net/blogProject-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/',route)
app.listen(3000,function(){

    console.log('express is running on port 3000')
});