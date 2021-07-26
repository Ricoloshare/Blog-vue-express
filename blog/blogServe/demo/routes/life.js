var express = require('express');
var router = express.Router();
const {getLifes,
    addOneLife} =  require("../controller/lifeController"); 

router.get('/lifes',async (req, res, next)=>{
    console.log(req.query);
    let result = await getLifes(); 
    return res.json(result);
}); 
router.post('/editlife',async (req, res, next)=>{
    console.log(req.body);
    let result = await addOneLife(req.body); 
    return res.json(result);
}); 
module.exports = router;