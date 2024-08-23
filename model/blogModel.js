

const makeBlogTable = (sequelize,DataTypes)=>{
    const Blog =  sequelize.define('blog',{   //blog name rakheni table name blogs hunxa jailey plural
    
         title : {
             type : DataTypes.STRING, 
             allowNull : false
         }, 
         subtitle : {
             type : DataTypes.STRING, 
             allowNull : false 
         }, 
         description : {
             type : DataTypes.TEXT, 
             allowNull : false
         }, 
         image : {
             type : DataTypes.STRING, 
         }
     })
     return Blog
 }
 
 module.exports = makeBlogTable
 