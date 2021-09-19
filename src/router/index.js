const express = require('express')
const router = express.Router()

const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const postRouter = require('./post.router')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/post', postRouter)
module.exports = router
