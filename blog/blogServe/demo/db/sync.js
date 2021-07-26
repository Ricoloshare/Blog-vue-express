const sequelize = require("./sequelize");

require("./model/user");
require("./model/blog");
require("./model/life");
const Megs = require("./model/meg");
const Reply = require("./model/reply");
Megs.hasOne(Reply)
Reply.belongsTo(Megs);   

sequelize.authenticate()
    .then(()=>{
        console.log("ok");
    })
    .catch((err)=>{
        console.log(err);
    })

sequelize.sync().then(()=>{
    // process.exit();
    console.log("okkkk");
})
.catch((e)=>{console.log(e)})



