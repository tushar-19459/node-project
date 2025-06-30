const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    phon: Number,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    isadmine: false,

})

module.exports = mongoose.model("users", userSchema)