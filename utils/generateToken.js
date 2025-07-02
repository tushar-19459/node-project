const jwt = require('jsonwebtoken');

module.exports.generatToken = (user) => {
    return jwt.sign({ email: user.email, fullname: user.fullname, _id: user._id }, process.env.JWT_KEY )
}

// module.exports.validToken = (user)=>{
//     return jwt.c({ email: user.email, fullname: user.fullname, _id: user._id }, process.env.JWT_KEY )
// }