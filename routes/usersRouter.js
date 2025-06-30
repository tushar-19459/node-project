const express = require('express');
const router = express.Router()
const registerUser = require('../controllers/authControler');

router.get('/', (req, res) => {
    res.send("user")
})

router.post('/register', registerUser )

module.exports = router