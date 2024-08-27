



const formMOdel = (sequelize,DataTypes) =>{
    const Form = sequelize.define('form',{
        firstname:{
            type :DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull:false
        },
        mail:{
            type:DataTypes.STRING,
            allowNull:false
        },

    })
    return Form
}

module.exports = formMOdel

