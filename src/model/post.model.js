const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const postSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: '',
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
