var express = require('express');
var router = express.Router();
const {loginCheck} =  require("../controller/userController"); 
/* GET users listing. */
router.post('/login',async (req, res, next)=>{
  console.log(req.body);
  let result = await loginCheck(req.body); 
  if(result.code == 200){
    req.session.username = result.data[0].username;
    req.session.code = result.code;
    console.log(result);
    console.log("200",req.session);
  }
  return res.json(result);
 
}); 
router.get('/check',(req, res, next)=>{
  console.log(req.session);
  if(req.session.username){
    res.json({code:200});
  }else{
    res.json({});
  }
}); 
module.exports = router;
