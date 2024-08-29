const express = require('express')
require('dotenv').config()   //yo code chai jun project ma ni rakhda hunxa
const { blogs,forms } = require('./model/index')
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage
const{multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage:storage})

const app = express()

app.use(express.urlencoded({extended: true}))  //node bata front banauda yo code rakhnu parxa jailey like ejs use gare vane

// app.use(express.json())  yo chai front and back diff vaya yo code rakhne

app.set('view engine','ejs')  //ejs ko kura bujnalai engine le yo code lekhne always

require("./model/index") //db link gareko main ghar app ma


app.get("/create",(req,res)=>{
    res.render('create.ejs')
})

app.post('/create',async(req,res)=>{
    const {title,subtitle,description} = req.body
      await blogs.create({
        title : title,
        subtitle : subtitle,
        description : description
    })
    res.send("blog added successfully")
    
})

app.get("/form",(req,res)=>{
    res.render('form.ejs')
})

app.post('/form',async(req,res)=>{
     const{firstname,lastname,gmail} =req.body
      await forms.create({
        firstname:firstname,
        lastname:lastname,
        mail:gmail                 
    })
    res.send("form submitted....!")
})

app.use(express.static('public/css/'))  //css lai path deko for access css file

app.listen(3000,()=>{
    console.log("project suru varo hai tw nodejs ko ");
    
})
