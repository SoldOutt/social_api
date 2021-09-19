const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const userController = {
    //updateuser
    async updateUser(req, res) {
        try {
            const id = req.params.id
            const user = await userModel.findById(id).exec()
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            } else {
                const dataUser = req.body
                if (dataUser.password) {
                    dataUser.password = await bcrypt.hash(
                        dataUser.password,
                        saltRounds
                    )
                }
                if (id === dataUser.id || user.isAdmin) {
                    await userModel
                        .findByIdAndUpdate(id, { $set: dataUser })
                        .exec()
                    return res.json({
                        success: true,
                        message: 'You have been updated successfully',
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'You can not update this user',
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },
    //deleteuser
    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await userModel.findById(id).exec()
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            } else {
                const dataUser = req.body
                if (id === dataUser.id || user.isAdmin) {
                    await userModel.findOneAndDelete(id)
                    return res.json({
                        success: true,
                        message: 'You have been delete successfully',
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'You can not delete this user',
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },

    //get a user
    async getUser(req, res) {
        try {
            const id = req.params.id
            const user = await userModel.findById(id)
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            } else {
                return res.json({ success: true, user })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },
    //follow user
    async followUser(req, res) {
        try {
            const userId = req.params.id

            const userCurrent = await userModel.findById(req.body.id)
            const user = await userModel.findById(userId)
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            if (user.followers.includes(userCurrent._id)) {
                res.status(400).json({
                    success: false,
                    message: 'You are following this user.',
                })
            } else {
                await user.updateOne({ $push: { followers: userCurrent._id } })
                await userCurrent.updateOne({
                    $push: { followings: user._id },
                })
                res.json({
                    success: true,
                    message: 'You have been following this user.',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },
    //unfollow user
    async unfollowUser(req, res) {
        try {
            const userId = req.params.id
            const userCurrent = await userModel.findById(req.body.id)
            const user = await userModel.findById(userId)
            if (!user || !userCurrent)
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            if (!user.followers.includes(userCurrent._id)) {
                res.status(400).json({
                    success: false,
                    message: 'You are not following this user',
                })
            } else {
                await user.updateOne({ $pull: { followers: userCurrent._id } })
                await userCurrent.updateOne({
                    $pull: { followings: user._id },
                })
                res.json({
                    success: true,
                    message: 'You have been unfollowing this user.',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },
}
module.exports = userController
