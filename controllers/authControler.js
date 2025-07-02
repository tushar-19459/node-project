const bcrypt = require('bcrypt');
const usersModel = require('../models/user-model')
const { generatToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body

        const checkuser = await usersModel.findOne({ email: email })
        if (checkuser)
            return res.status(401).send("User Existes")

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                res.send(err.message)
            } else {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        res.send(err.message)
                    } else {
                        const user = await usersModel.create({ email, password: hash, fullname })
                        const token = generatToken(user)
                        res.cookie('token', token)
                        res.send("User Created")
                    }
                })
            }
        })
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    const user = await usersModel.findOne({ email: email })
    if (user) {
        bcrypt.compare(password, user.password, (err, valid) => {
            if(valid){
                let token = generatToken(user)
                res.cookie('token',token)
                res.redirect("/shop")
            }else{
                // res.send("")
                req.flash("error",'invalid password')
                res.redirect('/')
            }
        })
    } else {
        req.flash("error",'user doesnot exist')
        res.redirect('/')
    }
}

module.exports.logoutUser = (req,res) =>{
    res.cookie("token","")
    res.redirect("/")
}

module.exports.cartUser = (req,res)=>{
    
}