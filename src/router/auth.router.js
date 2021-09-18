const express = require('express')
const router = express.Router()

router.get('/register', function (req, res) {
    res.send('register')
})
router.get('/login', function (req, res) {
    res.send('login')
})

module.exports = router
