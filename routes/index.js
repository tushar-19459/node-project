const express = require('express');
const { islogedin } = require('../middleware/isLogiedIn');
const productModel = require('../models/product-model');
const router = express.Router()
const { logoutUser } = require('../controllers/authControler');
const userModel = require('../models/user-model');


router.get('/', (req, res) => {
    error = req.flash("error")
    res.render('index', { error, logedin: false })
})

router.get('/shop', islogedin, async (req, res) => {
    const products = await productModel.find()
    const success = req.flash("success")
    res.render('shop', { products, success })
})

router.get('/remove/:id', islogedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })
    console.log("index "+user.cart.indexOf(req.params.id))
    const index = user.cart.indexOf(req.params.id)
    user.cart.splice(index,1)
    await user.save()
    req.flash("success", "poduct added ")
    res.redirect('/cart')
})
router.get('/addtocart/:id', islogedin, async (req, res) => {
    const products = await productModel.find()
    const user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.id)
    await user.save()
    req.flash("success", "poduct added ")
    res.redirect('/shop')
})

router.get('/cart', islogedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart')
    res.render("cart",{data:user.cart})
})

router.get('/logout', logoutUser)


module.exports = router