const sequelize = require("../sequelize");
const moment = require('moment');
const { Sequelize } = require('sequelize');
let Blog = sequelize.define("blog",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    author:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true 
    },
    content:{
        type:Sequelize.TEXT,
        allowNull:false,
        unique:false
    },
    classify:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false
    },
    views:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:false,
        defaultValue: 0
    },
    contact:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:false,
        defaultValue: 0
    },
    img:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false,
        defaultValue: ''
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
},{
    freezeTableName: true, //不需要自动表名变复数
    timestamps: true
}
);
 
module.exports = Blog;