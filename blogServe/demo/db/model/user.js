const sequelize = require("../sequelize");
const { Sequelize } = require('sequelize');
let User = sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false
    },
},{
    freezeTableName: true, //不需要自动表名变复数
    timestamps: true
}
);
 
module.exports = User;