import express from "express";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
// mongodb://localhost:27017
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"mydb"
}).then(()=>{
    console.log("database connected");
}).catch((e)=>console.log(e));
const app = express();
const PORT = 5000;
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")));//setting up public folder as static
//below we have used the middleware
app.use(express.urlencoded({extended:true}));
const schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    dob:String
});
const Message = mongoose.model("Message",schema);
app.get("/",(req,res)=>{
    res.render("form.ejs");
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.post("/success",(req,res)=>{
    const {name,email,password,dob} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(dob);
    Message.create({name,email,password,dob});
    res.render("success.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})



// app.post("/",(req,res)=>{
//     res.redirect("/success");
// })

app.listen(PORT,()=>{
    console.log(`server is working at ${PORT}`);
})