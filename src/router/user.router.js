const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.get('/:id', userController.getUser)
router.delete('/:id', userController.deleteUser)
router.put('/:id', userController.updateUser)
router.put('/:id/follow', userController.followUser)
router.delete('/:id/follow', userController.unfollowUser)
module.exports = router
