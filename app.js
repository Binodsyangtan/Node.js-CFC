const express = require('express')
const app = express()

app.set('view engine','ejs')  //ejs ko kura bujnalai engine le yo code lekhne always

require("./model/index") //db link gareko main ghar app ma

app.get('/',(req,res)=>{
    const data ={
        name:"Binod syangtan",
        age: 21,
        locaton :"kathmandu"
    }
    res.render("home.ejs",{
        data:data
    })
})
app.get('/about',(req,res)=>{
    res.render("about.ejs")
})

app.listen(3000,()=>{
    console.log("project suru varo hai tw nodejs ko ");
    
})
