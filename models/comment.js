
const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }

})

const Comment = new mongoose.model("Comment", commentSchema)

module.exports = {
    commentSchema,
    Comment
}
