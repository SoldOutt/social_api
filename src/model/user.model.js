// const User = mongoose.model('User', UserSchema);

const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            minLength: 10,
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
        desc: {
            type: String,
            maxLength: 50,
            default: '',
        },
        city: {
            type: String,
            maxLength: 50,
            default: '',
        },
        from: {
            type: String,
            maxLength: 50,
            default: '',
        },
        relationships: {
            type: Number,
            enum: [1, 2, 3],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
