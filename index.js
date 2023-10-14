import express from "express";
const app = express();
import fs from 'fs';
import path from "path";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbname:"backend",
}).then(()=>{
console.log("database connected");
}).catch(e=>console.log(e));
const messageSchema = new mongoose.Schema({
    name:String,
    email:String
});
const Message = mongoose.model("Message",messageSchema);//creating a model named as Message
//setting up the view engine
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")));//setting up public folder as static
//below we have used the middleware
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    // res.send("hello");
    // res.sendStatus(404);
    // res.status(400).send("meri marzi");
    // const file =fs.readFileSync("./index.html")
    // res.sendFile(file);
    res.render("index.ejs",{name:"something"});
    // res.sendFile("index.html");

    // const location = path.join(path.resolve(),"index.html");
    //path.resolve gives curr directory
    // console.log(location);
    // res.sendFile(location);

    // res.json({
    //     success:true,
    //     products:[],
    // })
})
app.get("/add",async (req,res)=>{
    await Message.create({name:"maninder",email:"sample@gmail.com"});
})
app.get("/success",(req,res)=>{
    res.send("success=true");
})
app.post("/contact",(req,res)=>{

    // Message.create({name:req.body.name,email:req.body.email});one way is this
    //2nd way which is called as destructuring
    const {name,email} = req.body;
    Message.create({name,email});

    res.send("<h1>thanks for filling the form</h1>");
})

app.post("/",(req,res)=>{
    // console.log(req.body.name);
    users.push({username:req.body.name,
    email:req.body.email});
    res.redirect("/success");
})
app.get("/users",(req,res)=>{
    res.json({
        users,
    })
})
app.get("/add",(req,res)=>{
    res.send("nice");
})

app.listen(5000,()=>{
    console.log("app is working");
})
