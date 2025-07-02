const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    phon: Number,
    email: String,
    password: String,
    cart:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        ]
    ,
    orders: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("users", userSchema)