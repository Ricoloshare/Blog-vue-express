const User = require("../db/model/user");
const {getBlogsArticle,creatBlogsArt} = require('../controller/blogController');
const generatePwd = require('../utils/crypto');

async function init(){
    let result = await getBlogsArticle(1);
    let b = '';
    let u = '';
    if(result.code != '200'){
    b = creatBlogsArt({
            title: '留言板title',  
            description: '留言板description', 
            content:'留言板content', 
            classify:'留言板classify', 
            author:'Ricolo',
            img:''
        });
    }
    let users = await User.findAll({
        where:{
            username:"Ricolo",
        }
    });
    if(users.length == 0){
    u =  User.create({
            username:"Ricolo",
            password: generatePwd("Lqianqian8888")
        });
    }
    if(u && b){
        console.log("初始化成功");
    }
}

module.exports = init;
