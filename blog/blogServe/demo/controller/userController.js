const Ajv = require("ajv").default;
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const userSchema = require('../validator/userValidator');
const validate = ajv.compile(userSchema);
const {getUser} = require('../service/userService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
const{userDataFail,userExistsFail,userRegisterFail,userLoginFail} = require('../config/errorConfig');
const generatePwd = require('../utils/crypto');

async function loginCheck({username,password}){
    let user = await getUser(username,generatePwd(password));
    console.log(user,username,password );
    if(user.length){
        return new SuccessModel({msg:'登录成功',data: user});
    }else{
        console.log("userLoginFail");
        return new ErrorModel(userLoginFail);
    }
}

module.exports = {
    loginCheck
}