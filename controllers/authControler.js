const bcrypt = require('bcrypt');
const usersModel = require('../models/user-model')
const generatToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body
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
                        res.send("user created")
                    }
                })
            }
        })
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = registerUser