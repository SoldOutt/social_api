const postModel = require('../model/post.model')
const userModel = require('../model/user.model')
const postController = {
    //get a post
    async getPost(req, res) {
        try {
            const postId = req.params.id

            const post = await postModel.findById(postId)
            if (!post) {
                res.status(400).json({
                    success: false,
                    message: 'post not found',
                })
            }
            //all good
            return res.json({
                success: true,
                post,
            })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },

    //create a new post
    async createPost(req, res) {
        try {
            const newPost = new postModel({
                userId: req.user.id,
                desc: req.body.desc,
                img: '' || req.body.img,
            })
            await newPost.save()
            return res.json({
                success: true,
                message: 'Create post successfully',
            })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
    //update post
    async updatePost(req, res) {
        try {
            const postId = req.params.id

            const post = await postModel.findById(postId)
            if (!post) {
                res.status(400).json({
                    success: false,
                    message: 'post not found',
                })
            }

            if (post.userId !== req.user.id) {
                res.status(400).json({
                    success: false,
                    message: 'You can update only your post',
                })
            }
            //all good

            post.updateOne({ $push: req.body })
            return res.json({
                success: true,
                message: 'Update post successfully',
            })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
    //delete post
    async deletePost(req, res) {
        try {
            const postId = req.params.id

            const post = await postModel.findById(postId)
            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: 'post not found',
                })
            }

            if (post.userId !== req.user.id) {
                res.status(400).json({
                    success: false,
                    message: 'You can not delete this post',
                })
            }
            //all good

            await postModel.findByIdAndDelete(postId)
            return res.json({
                success: true,
                message: 'Deleted post successfully',
            })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
    //like-unlike post
    async likePost(req, res) {
        try {
            const postId = req.params.id

            const post = await postModel.findById(postId)
            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: 'post not found',
                })
            }

            //all good
            if (post.likes.includes(req.user.id)) {
                await post.updateOne({ $pull: { likes: req.user.id } })
                return res.json({
                    success: true,
                    message: 'Dilike post successfully',
                    add: false,
                })
            } else {
                await post.updateOne({ $push: { likes: req.user.id } })
                return res.json({
                    success: true,
                    message: 'Like post successfully',
                    add: true,
                })
            }
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
    //timline post
    async getTimeline(req, res) {
        try {
            const user = await userModel.findById(req.user.id)
            const currentPost = await postModel.find({ userId: user.id })

            const friendPost = await Promise.all(
                user.followings.map((friendId) => {
                    return postModel.find({ userId: friendId })
                })
            )
            console.log(friendPost)
            const postTimeline = currentPost.concat(...friendPost)
            return res.json({ success: true, postTimeline })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, message: error.message })
        }
    },
}
module.exports = postController
