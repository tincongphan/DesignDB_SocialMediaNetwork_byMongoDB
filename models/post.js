
const mongoose = require('mongoose');
const { commentSchema } = require('./comment');
const { likeSchema } = require('./like');
const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: "true"
    },
    title: { type: String, require: true },
    content: { type: String, require: true },
    likes:{
        type : [likeSchema]
    }

    // comment use tech bucketting
})

const Post = new mongoose.model("Post", postSchema)

module.exports = {
    postSchema,
    Post
}
