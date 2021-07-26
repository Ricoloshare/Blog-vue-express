const Blog = require("../db/model/blog");

//获取文章列表
async function getBlogsList(limit){
    try {
        let result = await Blog.findAll({
            attributes: { exclude: ['content'] },
            'order': [['createdAt', 'DESC']],
            limit:limit
        });
        return result;
    } catch (error) {
        return error
    }
}
async function getHotList(){
    try {
        let result = await Blog.findAll({
            attributes: { exclude: ['content',"img","description"] },
            'order': [['views', 'DESC']],
            limit:10
        });
        return result;
    } catch (error) {
        return error
    }
}
//获取文章
async function getBlogsArt({id}){
    try {
        let result = await Blog.findAll({
            where:{
                id:id,
            }
        });
        return result;
    } catch (error) {
        return error
    }
}
//添加文章
async function getBlogsAdd({title, description, content,classify,author,img}){
    try {
        let result = await Blog.create({ title: title, description: description, content:content, classify:classify,author:author,img:img});
        return result;
    } catch (error) {
        return error
    }
}
//删除文章
async function getBlogsRemove({id}){
    try {
        let result = await Blog.destroy({
            where: {
                id: id
            }
          });
        return result;
    } catch (error) {
        return error
    }
    
}
//修改文章
async function getBlogsEdit({id,title, description, content,classify,author,img}){
    try {
        let result = await Blog.update({title: title, description: description, content:content, classify:classify,author:author,img:img},{
            where: {
                id: id
            }
          });
        return result;
    } catch (error) {
        return error
    }
}
//增加阅读量
async function addBlogsView({id,views}){
    try {
        let result = await Blog.update({views:++views},{
            where: {
                id: id
            }
          });
        return result;
    } catch (error) {
        return error
    }
}
//获取文章分类
async function getClassifyList({classify}){
    try {
        let result = await Blog.findAll({
            attributes: { exclude: ['content'] },
            where: {
                classify: classify
            }
        });
        return result;
    } catch (error) {
        return error
    }
}
module.exports = {
    getBlogsList,
    getBlogsArt,
    getBlogsAdd,
    getBlogsRemove,
    getBlogsEdit,
    getClassifyList,
    addBlogsView,
    getHotList
}
