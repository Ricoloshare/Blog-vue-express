const Ajv = require("ajv").default;
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const lifeSchema = require('../validator/lifeValidator');
const validate = ajv.compile(lifeSchema);
const {getLife,
    addLife} = require('../service/lifeService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
const{getLifesFail,
      addLifesFail
} = require('../config/errorConfig');

async function getLifes(){
    let result = await getLife();
    console.log(result);
    if(result.length){
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        console.log("getLifesFail");
        return new ErrorModel(getLifesFail);
    }
}
async function addOneLife({content}){
    let valid = validate({content});
    console.log("valid",valid);
    console.log(validate.errors);
    let result = await addLife({content});
    console.log(result);
    if(result){
        return new SuccessModel({msg:'添加成功',data: result});
    }else{
        console.log("addLifesFail");
        return new ErrorModel(addLifesFail);
    }
}
module.exports = {
    getLifes,
    addOneLife
}