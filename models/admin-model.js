const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        trim:true
    },
    phon: Number,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: {
        type: Array,
        default: []
    },
    price:string,
    gstin:string,

})

module.exports = mongoose.model("admin", adminSchema)