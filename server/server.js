const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const path = require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
require('dotenv').config();

app.use(express.static(path.join(__dirname, "dist")))
////////////////   SETTING UP OUR DATABASE ///////////////////////////////////////
/////// mongoose connecting to the server ////////////////////////////////////////////
mongoose.connect(process.env.URL).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{  console.log(err)})
////////////////////////// mongoose schema settup/////////////////////////////////////////  
const KeeperSchema = new mongoose.Schema({
    heading: String,
    content: String
})

/////////////////////////////////// model
const Keeper = mongoose.model("Keeper", KeeperSchema)

app.get("/", (req,res)=>{
    res.send("server is running");
})

app.get("/getitem", async(req,res)=>{
    await Keeper.find().then((data)=>{
        res.status(200).json({data})
    })
})

app.post("/additem", async(req,res)=>{
    const {heading, content} = req.body
    await Keeper.create({heading, content}).then(()=>{
        res.status(200).json({message:"successfully added"})
    }).catch(err=>console.log(err))
})

app.post("/delete", async(req,res)=>{
    let{_id}= req.body
    await Keeper.deleteOne(_id).then(async(data)=>{
        let users = await Keeper.find()
        res.status(200).json({users})
    }).catch(err=>{console.log(err)})
   
})

app.listen(process.env.PORT||3000, ()=>{
    console.log("server is running on port 3000")
})