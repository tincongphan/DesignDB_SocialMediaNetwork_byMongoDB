
const mongoose = require('mongoose');
// load model
const { User } = require('../models/user');
const { Post } = require("../models/post")

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })

// create post
function createPost(userId, title, content) {

    User
        .findById(userId)
        .then((user) => {
            if (!user) return console.log("user doesn't exist")
            const newPost = new Post({
                userId, title, content
            })
            return newPost.save()
        })
        .then(console.log)
        .catch(console.log)

}

createPost(
    "60eafb13d954352498ebad6a",
    "VN win Philiphines 2-1",
    "Tks Park Hang Seo..."
)

// update post
function updatePost(postId, title, content){

    Post
        .updateOne({_id: postId}, {
            $set: {
                title,
                content
            }
        })
        .then(console.log)
        .catch(console.log)
}

updatePost(
    "60eb259face4382dbcc0fbd1",
    "champion ship",
    "MU champion"
)

// query . Find people who posted post

Post
    .find()
    .populate("userId", "username -_id")
    .then(console.log)
    .catch(console.log)

//  delete post

function deletePost(postId){
    Post
        .findByIdAndDelete(postId)
        .then(console.log)
        .catch(console.log)
}

deletePost("60eb259face4382dbcc0fbd9")