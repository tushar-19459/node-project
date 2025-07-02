const express = require('express');
const router = express.Router()
const productsModel = require('../models/product-model');
const upload = require("../config/multer-configeration")

router.get('/', (req, res) => {
    res.send("products")
})

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
        const data = await productsModel.create({ name, price, discount, bgcolor, panelcolor, textcolor, image: req.file.buffer })
        req.flash("success", "product created succesfully ")
        res.redirect("/admins/adminpanel")
    } catch (error) {
        req.flash("success", "product not created ")
        res.send(error.message)
    }
})

module.exports = router