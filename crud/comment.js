
const mongoose = require('mongoose');
// load model
const { Post } = require("../models/post")
const { Comment } = require("../models/comment")

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })


// create comment

function createComment(postId, userId, content) {
    Post
        .findById(postId)
        .then((post) => {
            if (!post) {
                return console.log("post doesn't exist")
            } else {
                const newComment = new Comment({
                    postId,
                    userId,
                    content
                })
                return newComment.save()
            }
        })
        .then(console.log)
        .catch(console.log)
}

createComment(
    "60eb24bd892feb1190a3b378",
    "60eafb13d954352498ebad6a",
    "Italy champion Euro 2021"
)
createComment(
    "60eb24bd892feb1190a3b378",
    "60eaedc49d16832f8cbc127f",
    "Viet Nam won Thai Lan"
)

//  kĩ thuật bucketing giống referencing. Khác ở chỗ query

// query comment
function queryComment(postId){
    Comment.aggregate()
    .facet({
        post: [
            {
                $bucketAuto:
                {
                    groupBy: '$postId',
                    buckets: 2,
                    output: {
                        comments: { $push: { content: '$content' } }
                    }
                }
            }
        ]
    })
    .then(comments => console.log(JSON.stringify(comments, undefined, 2)))
    .catch(console.log)
}
queryComment("60eb24bd892feb1190a3b378")

// update comment
function updateComment(commentId, content){
    Comment
        .updateOne({_id: commentId}, {
            $set: {
                content
            }
        })
        .then(console.log)
        .catch(console.log)
}

updateComment("60ebfbf02aa1b021d07eac40", "ThaiLan losed VietNam")