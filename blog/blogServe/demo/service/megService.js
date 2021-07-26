const Meg = require("../db/model/meg");
const Reply = require("../db/model/reply");

//添加留言
async function createMegs({name,type,email,content,star}){
    try {
        let result = await Meg.create({ 
            name:name,
            email:email,
            content:content,
            type: type,
            star: star
        });
        return result;
    } catch (error) {
        return error
    }
}
//回复留言
async function replyMegs({type,uid, name, email, content,star}){
    try {
        let result = await Reply.create({ 
            uid: uid, 
            type:type,
            name:name,
            email:email,
            content:content,
            star: star
        });
        return result;
    } catch (error) {
        return error
    }
}
//获取留言
async function getMegs({type}){
    try {
        let result = await Meg.findAll({
            where:{
                type:type,
            },
            'order': [['createdAt', 'DESC']]
        });
        return result;
    } catch (error) {
        return error
    }
}
//获取回复
async function getReplys({id}){
    try {
        let result = await Reply.findAll({
            where:{
                uid:id,
            },
            'order': [['createdAt', 'ASC']]
        });
        return result;
    } catch (error) {
        return error  
    }
}
//删除回复
async function delReplys({id}){
    try {
        let result = await Reply.destroy({
            where:{
                uid:id,
            },
        });
        return result;
    } catch (error) {
        return error
    }
}
async function delOneReply({id}){
    try {
        let result = await Reply.destroy({
            where:{
                id:id,
            },
        });
        return result;
    } catch (error) {
        return error
    }
}
//删除留言
async function delMeg({id}){
    try {
        let result = await Meg.destroy({
            where:{
                id:id,
            },
        });
        return result;
    } catch (error) {
        return error
    }
}

//删除所有类型回复
async function delAlltypeRe(type){
    try {
        let result = await Reply.destroy({
            where:{
                type:type,
            },
        });
        return result;
    } catch (error) {
        return error
    }
}
//删除所有类型留言
async function delAlltypeMeg(type){
    try {
        let result = await Meg.destroy({
            where:{
                type:type,
            },
        });
        return result;
    } catch (error) {
        return error
    }
}
module.exports = {
    createMegs,
    replyMegs,
    getReplys,
    getMegs,
    delMeg,
    delReplys,
    delOneReply,
    delAlltypeRe,
    delAlltypeMeg
}
