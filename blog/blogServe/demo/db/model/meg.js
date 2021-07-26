const sequelize = require("../sequelize");
const moment = require('moment');
const { Sequelize } = require('sequelize');

let Megs = sequelize.define("meg",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    star:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    type:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: 'blog',
            key: 'id',
        }
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

module.exports = Megs;