var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const {
  getBlogs,
  getBlogsArticle,
  creatBlogsArt,
  editBlogsArt,
  deleBlogsArt,
  getClassify,
  getHotBlogs
} = require("../controller/blogController");
var formidable = require("formidable");
/* GET users listing. */
router.get('/blogs', async (req, res, next) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh",req.query);
  let result = await getBlogs(req.query);
  return res.json(result);

});
router.get('/hot', async (req, res, next) => {
  console.log(req.query);
  let result = await getHotBlogs();
  return res.json(result);

});
router.get('/art', async (req, res, next) => {
  console.log(req.query);
  let result = await getBlogsArticle(req.query);
  return res.json(result);
});
router.post('/addart', async (req, res, next) => {
  console.log(req.body);
  let result = await creatBlogsArt(req.body);
  return res.json(result);
});
router.post('/editart', async (req, res, next) => {
  console.log(req.body);
  let result = await editBlogsArt(req.body);
  return res.json(result);
});
router.post('/editart/img', async (req, res, next) => {
  const form = formidable({
    multiples: true
  });
  // 设置编码
  form.encoding = 'utf-8';
  // 保留后缀名
  form.keepExtensions = true;
  // 设置存储路径
  form.uploadDir = path.join(__dirname, '../public/img/');
  form.parse(req, function (err, fields, files) {
    console.log('fields', fields); //表单传递的input数据  
    console.log('files', files); //上传文件数据  
    if (err) return next(err);
    let date = (new Date()).getTime();
    // 获取文件路径
    let oldPath = files.file.path;
    console.log(`oldPath: ${oldPath}`);
    // 上传的图片名
    let imgName = files.file.name;
    // console.log(`imgName: ${imgName}`);
    // 用activity_替换图片名
    let newImgName = imgName.replace(/[^.]+/, `activity_${date}`);
    console.log(`newImgName: ${newImgName}`)
    // 组合成新路径名
    let newPath = path.join(path.dirname(oldPath), newImgName);
    console.log(`newPath: ${newPath}`)
    // 图片文件重命名路径
    fs.rename(oldPath, newPath, err => {
      if (err) next(err);
      return res.send({imgName: newImgName, url: `/img/${newImgName}`});
    })
  });
});
router.get('/delart', async (req, res, next) => {
  console.log(req.query);
  let result = await deleBlogsArt(req.query);
  return res.json(result);
});
router.get('/classify', async (req, res, next) => {
  console.log(req.query);
  let result = await getClassify(req.query);
  return res.json(result);
});
module.exports = router;