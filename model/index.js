const {Sequelize,DataTypes, Model} = require('sequelize');
const databaseConfig = require('../config/dbConfig');
const makeBlogTable = require('./blogModel');


const sequelize = new Sequelize(databaseConfig.db,databaseConfig.username,databaseConfig.password,{
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
    operatorsAliases: false,
    pool :{
        max :5,
        min : 0,
        acquire :3000,
        idle: 10000
    }
    
})
sequelize.authenticate()
.then(()=>{
    console.log("milyou hai username and password"); 
})
.catch((err)=>{
    console.log("error aaayo hai",err);
    
})

const db ={}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.blogs = makeBlogTable(sequelize,DataTypes)

db.sequelize.sync({force : false}).then(()=>{
    console.log("Synced done!!");
    
})

module.exports = db










// const me ={}

// me.name ="binod"
// me.age = 22
// //bahira bata mitra haleko object ma
// //yesari hunxa last ma code
// const me ={
//     name:"binod",
//     age: 22

// }
