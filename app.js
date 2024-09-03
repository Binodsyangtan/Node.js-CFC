const express = require("express");
require("dotenv").config(); //yo code chai jun project ma ni rakhda hunxa
const { blogs, forms, users } = require("./model/index");
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage
const { multer, storage } = require("./middleware/multerConfig");
const { render } = require("ejs");
const { where } = require("sequelize");
const upload = multer({ storage: storage });
const bcrypt = require("bcrypt")

const app = express();

app.use(express.urlencoded({ extended: true })); //node bata front banauda yo code rakhnu parxa jailey like ejs use gare vane

// app.use(express.json())  yo chai front and back diff vaya yo code rakhne

app.set("view engine", "ejs"); //ejs ko kura bujnalai engine le yo code lekhne always

require("./model/index"); //db link gareko main ghar app ma

app.get("/", async (req, res) => {
  const datas = await blogs.findAll(); // select * from blogs (raw query)
  
  res.render("home.ejs", {
    blogs: datas,
  });
});


app.get("/blog/:id", async(req, res) => {
  const id = req.params.id
  const blog = await blogs.findByPk(id)  //return object
  
  res.render("singleBlog",{blog: blog});
});

app.get("/delete/:id",async (req,res)=>{
  const id = req.params.id
   await blogs.destroy({
    where:{
      id : id //blogs table ma column ko id sanga id match gare delte garde
    }
  })
  res.redirect("/")
  // res.send("delete vayo ")  message pathako 
})

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const { title, subtitle, description } = req.body;
  await blogs.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  });
  res.send("blog added successfully");
});

app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.post("/form", upload.single("image"), async (req, res) => {
  const { firstname, lastname, gmail, image } = req.body;
  await forms.create({
    firstname: firstname,
    lastname: lastname,
    mail: gmail,
    image: image,
  });
  res.send("form submitted....!");
});
 
app.get("/register",(req,res)=>{
  res.render("register")
})
app.post("/register",async (req,res)=>{
  const{username,email,password} =req.body
   await users.create({  //users lekheko xa db.user in index so j xa tai use garni 
    username: username,
    email: email,
    password:bcrypt.hashSync(password,8)
  });
  res.redirect("/login") //new page ma falnu xa vane redirect user garinxa 
})

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/login", async (req,res)=>{
  const {email, password} =req.body
  //check wheter that email exist or not in users table
   const data = await users.findAll({
    where : {
      email: email
    }
  }) 
  if(data.length == 0 ){
    res.send ("no user with that email")
  }else{
    //now check password
    const isMatched = bcrypt.compareSync(password,data[0].password)
    if(isMatched){
      res.send ("logged in succes ")

    }else{
      res.send("invalid password")
    }
  }

})



app.use(express.static("public/css/")); //css lai path deko for access css file
app.use(express.static("./storage/"))

app.listen(3000, () => {
  console.log("project suru varo hai tw nodejs ko ");
});
