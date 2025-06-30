const express = require('express');
const router = express.Router()
const productsModel =  require('../models/product-model');
router.get('/', (req, res) => {
    res.send("products")
})

module.exports = router