const Life = require("../db/model/life");

async function getLife(){
    try {
        let result = await Life.findAll({
            'order': [['createdAt', 'DESC']]
        });
        return result;
    } catch (error) {
        return error;
    }
}
async function addLife({content}) {
    console.log(content)
    try {
        let result = await Life.create({
            content:content,
        });
        return result;
    } catch (error) {
        return error;
    }
    
}
module.exports = {
    getLife,
    addLife
}