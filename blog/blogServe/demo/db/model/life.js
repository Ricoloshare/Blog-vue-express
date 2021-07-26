const sequelize = require("../sequelize");
const moment = require('moment');
const { Sequelize } = require('sequelize');
let Life = sequelize.define("life",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false,
        // unique:true
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
    timestamps: true,
}
);
 
module.exports = Life;