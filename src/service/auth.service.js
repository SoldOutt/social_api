const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const saltRounds = 10
const authService = {
    async register(req, res) {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing user name or password',
                })
            }
            const userOnDb = await userModel
                .findOne({
                    username: req.body.username,
                })
                .exec()
            if (userOnDb) {
                return res.status(400).json({
                    success: false,
                    message: 'User name is already registered',
                })
            }
            const passwordHash = await bcrypt.hash(
                req.body.password,
                saltRounds
            )
            user = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: passwordHash,
            })

            await user.save()

            return res.json({
                success: true,
                message: 'Chuc mung ban da dang ki thanh cong',
                user,
            })
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
    },
    async login(req, res) {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing user name or password',
                })
            }
            const userOnDb = await userModel
                .findOne({
                    username: req.body.username,
                })
                .exec()
            if (!userOnDb) {
                return res.status(400).json({
                    success: false,
                    message: 'User name or password is incorrect',
                })
            }
            isConfirmPassword = await bcrypt.compare(
                req.body.password,
                userOnDb.password
            )
            console.log(isConfirmPassword)
            if (!isConfirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'User name or password is incorrect',
                })
            }

            // All good
            const jwtSign = await jwt.sign(
                { username: req.body.username },
                process.env.KEY_JWT
            )
            return res.json({
                success: true,
                message: 'Chuc mung ban da dang nhap thanh cong',
                jwtSign: jwtSign,
            })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    },
}
module.exports = authService
