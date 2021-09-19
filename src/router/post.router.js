const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const authMiddleware = require('../middleware/auth.middleware')
const postController = require('../controller/post.controller')

//create post
router.post('/', authMiddleware.verifyToken, postController.createPost)
//get post timeline
router.get('/timeline', authMiddleware.verifyToken, postController.getTimeline)
//update post
router.put('/:id', authMiddleware.verifyToken, postController.updatePost)
//get post
router.get('/:id', authMiddleware.verifyToken, postController.getPost)
//delete post
router.delete('/:id', authMiddleware.verifyToken, postController.deletePost)
//like-unlike post
router.put('/:id/like', authMiddleware.verifyToken, postController.likePost)
// get timeline post

module.exports = router
