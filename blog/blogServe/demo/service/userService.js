const User = require("../db/model/user");

async function getUser(username,password){
    try {
        let result = await User.findAll({
            where:{
            username:username,
            password:password
            }
        });
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    getUser,
    // createUser
}