const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const authMiddleware = {
    async verifyToken(req, res, next) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: 'Token not found' })
        }
        try {
            const decoded = jwt.verify(token, process.env.KEY_JWT)
            req.user = decoded
            next()
        } catch (error) {
            console.error(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
}
module.exports = authMiddleware
