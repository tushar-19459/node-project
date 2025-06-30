const jwt = require('jsonwebtoken');

const generatToken = (user) => {
    return jwt.sign({ email: user.email, fullname: user.fullname, _id: user._id }, process.env.JWT_KEY )
}
module.exports = generatToken