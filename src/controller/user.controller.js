const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const userController = {
    //updateuser
    async updateuser(req, res) {
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
    //unfollow user
}
module.exports = userController
