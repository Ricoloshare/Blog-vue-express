class BaseModel{
    constructor({code, msg, data}){
        this.msg = msg;
        this.data = data;
        this.code = code;
    }
}

class SuccessModel extends BaseModel{
    constructor({code, msg, data}){
        super({code, msg, data});
        this.code = 200;
    }
}

class ErrorModel extends BaseModel{
    constructor({code, msg, data}){
        super({code, msg, data});
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}