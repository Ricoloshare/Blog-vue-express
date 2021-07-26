const Ajv = require("ajv").default;
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const blogSchema = require('../validator/blogValidator');
const validate = ajv.compile(blogSchema);
const{getBlogsFail,
    getBlogsArtFail,
    creatBlogsArtFail,
    editBlogsArtFail,
    deleBlogsArtFail,
    getClassifyFail
} = require('../config/errorConfig');
const {
    getBlogsList,
    getBlogsArt,
    getBlogsAdd,
    getBlogsRemove,
    getBlogsEdit,
    getClassifyList,
    addBlogsView,
    getHotList} = require('../service/blogService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
const {delTypeMeg} = require("./mesController");


function blogValidate(data){
    console.log(validate);
    return valid = validate(data);
}

//获取最新博客列表
async function getBlogs({limit}){
    let lim = parseInt(limit);
    let blogs = await getBlogsList(lim);
    console.log(blogs);
    if(blogs.length){
        if(blogs.length > 1){
            blogs.pop(); //把留言板去掉
            return new SuccessModel({msg:'获取成功',data: blogs}); 
        }else{
           return new SuccessModel({msg:'获取成功',data: []}); 
        }
    }else{
        console.log("getBlogsFail");
        return new ErrorModel(getBlogsFail);
    }
}
//获取最热博客列表
async function getHotBlogs(){
    let blogs = await getHotList();
    console.log(blogs);
    if(blogs.length){
        if(blogs.length > 1){
            blogs.pop(); //把留言板去掉
            return new SuccessModel({msg:'获取成功',data: blogs}); 
        }else{
           return new SuccessModel({msg:'获取成功',data: []}); 
        }
    }else{
        console.log("getBlogsFail");
        return new ErrorModel(getBlogsFail);
    }
}
//获取博客文章
async function getBlogsArticle(id){
    let art = await getBlogsArt(id);
    // console.log(art);
    if(art.length){
        let result = addBlogsView(art[0]);
        console.log(result);
        return new SuccessModel({msg:'获取成功',data: art});
    }else{
        console.log("getBlogsArtFail");
        return new ErrorModel(getBlogsArtFail);
    }
}
//添加博客文章
async function creatBlogsArt({title, description, content,classify,author,img}){
    let valid = blogValidate({title, description, content,classify,author,img});
    console.log("valid",valid);
    console.log(validate.errors);
    if(!valid){
        return new ErrorModel(creatBlogsArtFail);
    }
    let art = await getBlogsAdd({title, description, content,classify,author,img});
    console.log("art",art);
    if(art){
        return new SuccessModel({msg:'创建成功',data: art});
    }else{
        console.log("creatBlogsArtFail");
        return new ErrorModel(creatBlogsArtFail);
    }
}
//删除博客文章
async function deleBlogsArt({id}){
    await delTypeMeg(id);
    let art = await getBlogsRemove({id});
    console.log(art);
    if(art){
        return new SuccessModel({msg:'删除成功',data: art});
    }else{
        console.log("deleBlogsArtFail");
        return new ErrorModel(deleBlogsArtFail);
    }
}
//编辑博客文章
async function editBlogsArt({id,title, description, content,classify,author,img}){
    let valid = blogValidate({title, description, content,classify,author,img});
    if(!valid){
        return new ErrorModel(editBlogsArtFail);
    }
    let art = await getBlogsEdit({id,title, description, content,classify,author,img});
    console.log(art);
    if(art.length){
        return new SuccessModel({msg:'编辑成功',data: art});
    }else{
        console.log("editBlogsArtFail");
        return new ErrorModel(editBlogsArtFail);
    }
}
//获取博客分类列表
async function getClassify({classify}){
    let sor = await getClassifyList({classify});
    console.log(sor);
    if(sor){
        return new SuccessModel({msg:'获取成功',data: sor});
    }else{
        console.log("getClassifyFail");
        return new ErrorModel(getClassifyFail);
    }
}
module.exports = {
    getBlogs,
    getBlogsArticle,
    creatBlogsArt,
    editBlogsArt,
    deleBlogsArt,
    getClassify,
    getHotBlogs
}