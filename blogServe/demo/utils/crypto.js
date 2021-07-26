const crypto = require('crypto');
const secret = 'll7defg';

function _md5(password){
    const md5 = crypto.createHash('md5');
    const hash = md5.update(password)
                    .digest('hex');
    console.log(hash);
    return hash;
}
function generatePwd(password){
    password = password + secret;
    let hash = _md5(password);
    return hash;
}

generatePwd('password');

module.exports = generatePwd;