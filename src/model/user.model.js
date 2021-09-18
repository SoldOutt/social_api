// const User = mongoose.model('User', UserSchema);

const { Schema } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 10,
        },
        password: {
            type: String,
            required: true,
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
