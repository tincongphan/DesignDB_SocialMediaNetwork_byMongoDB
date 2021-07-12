
const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    content: {
        type: String,
        require : true
    }, 
    createDate : {type : Date, default: new Date().getTime()}

})

const Comment = new mongoose.model("Comment", commentSchema)

module.exports = {
    commentSchema,
    Comment
}
