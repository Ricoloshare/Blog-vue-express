const Ajv = require("ajv").default;
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const megSchema = require('../validator/megValidator');
const megvalidate = ajv.compile(megSchema);
const reSchema = require('../validator/replyValidator');
const revalidate = ajv.compile(reSchema);
const {createMegs,
    replyMegs,
    getReplys,
    getMegs,
    delMeg,
    delReplys,
    delOneReply,
    delAlltypeRe,
    delAlltypeMeg} = require('../service/megService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
const{createMegsFail,createReplyFail,getMegFail,delMegFail} = require('../config/errorConfig');

async function createMessage({type, name, email, content,star}){
    let valid = megvalidate({type, name, email, content});
    console.log("valid",valid);
    console.log(megvalidate.errors);
    if(!valid){ 
        return new ErrorModel(createMegsFail);
    }
    let result = await createMegs({type, name, email, content,star});
    console.log("result",result);
    if(result){
        return new SuccessModel({msg:'创建成功',data: result});
    }else{
        console.log("createMegsFail");
        return new ErrorModel(createMegsFail);
    }
}
async function createReply({type,uid, name, email, content,star}){
    let valid = revalidate({type,uid, name, email, content});
    console.log("valid",valid);
    console.log(revalidate.errors);
    if(!valid){ 
        return new ErrorModel(createReplyFail);
    }
    let result = await replyMegs({type,uid, name, email, content,star});
    console.log("result",result); 
    if(result){
        return new SuccessModel({msg:'创建成功',data: result});
    }else{
        console.log("createReplyFail");
        return new ErrorModel(createReplyFail);
    }
}
async function getMessage({type}){
    let result = [];
    let megs = await getMegs({type});
    if(megs.length != 0){
        for(let i = 0; i < megs.length; i++){
            result[i] = {};
            result[i].megs = megs[i];
            let replys = await getReplys(megs[i]);
            if(replys){
                result[i].reply = replys;
            }
        }
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        console.log("getMegFail");
        return new ErrorModel(getMegFail);
    }
}
async function delReply({id}){
    let result = await delOneReply({id});
    if(result.length != 0){
        return new SuccessModel({msg:'删除成功',data: result});
    }else{
        console.log("delMegFail");
        return new ErrorModel(delMegFail);
    }
}
async function delMessage({id}){
    let megs = await delReplys({id});
    if(megs.length != 0){
        let result = await delMeg({id});
        if(result.length != 0){
           return new SuccessModel({msg:'删除成功',data: result}); 
        }else{
            console.log("delMegFail");
            return new ErrorModel(delMegFail);
        }
    }else{
        console.log("delMegFail");
        return new ErrorModel(delMegFail);
    }
}

async function delTypeMeg(type){
    let result = await delAlltypeRe(type);
    console.log("sssssssssssssffffffffffffffffffffffffwwwwwwwwwwwwwww",result)
    if(result.length != 0){
        let result = await delAlltypeMeg(type);
        if(result.length != 0){
           return result; 
        }else{
            console.log("delMegFail");
            return new ErrorModel(delMegFail);
        }
    }else{
        console.log("delMegFail");
        return new ErrorModel(delMegFail);
    }
}
module.exports = {
    createMessage,
    createReply,
    getMessage,
    delReply,
    delMessage,
    delTypeMeg
}