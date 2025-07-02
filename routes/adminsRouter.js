const express = require('express');
const router = express.Router()
const adminModel = require('../models/admin-model')

router.get('/', (req, res) => {
    // console.log("this is admin")
    res.send("admin")
})

router.get("/adminpanel",(req,res)=>{
    success = req.flash("success")
    res.render('createproducts',{success})
})




//the fuction runs only in development env 
if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        const admin = await adminModel.find()
        if (admin.length > 0) {
            return res.status(503).send("you dont have permission to create a new owneer")
        }
        const { fullname, email, password } = req.body
        const createadmin = await adminModel.create({ fullname, email, password })
        res.status(201).send(" createed a new owner ")
    })
}

module.exports = router