const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.islogedin = (req, res, next) => {
    if (req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_KEY, async (err, decoded) => {
                if (err) res.send(err.message)
                const user = await userModel.findOne({ email: decoded.email }).select("-password")
                // console.log(user)
                req.user = user
                next()
                // res.redirect("/shop")
            })
        } catch (error) {
            req.flash("error", "somthing went wrong")
            res.redirect("/")
        }
    } else {
        req.flash("error", "you must be loged in first")
        res.redirect("/")
    }
}
