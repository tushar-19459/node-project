const express = require('express');
const router = express.Router()
const { registerUser, loginUser, logoutUser, cartUser } = require('../controllers/authControler');
const { islogedin } = require('../middleware/isLogiedIn');



router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.get('/cart',islogedin, cartUser)

module.exports = router