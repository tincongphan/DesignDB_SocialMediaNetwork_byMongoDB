
const mongoose = require('mongoose');
// load model
const { User } = require('../models/user');
const { Post } = require("../models/post")
const { Like } = require("../models/like")

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })

// create like and dislike

function likeAndDislike(postId, userId) {

    Post
        .findById(postId)
        .then((post) => {

            if (!post) {
                return console.log("post doesn't exist")
            } else {

                let index = -1;
                //  duyệt qua mảng like xem user đã like chưa
                //  không dùng for in or for of trong mongoose
                for (let i = 0; i < post.likes.length; i++) {
                    if (post.likes[i].userId.equals(userId)) {
                        //  user đã like thì dislike
                        post.likes.splice(i, 1)
                        index = i;
                        break;
                    } 
                }
                // user chưa like
                if(index === -1){
                    const newLike = new Like({userId})
                    post.likes.push(newLike)
                }
            }
            return post.save()
        })
        .then(console.log)
        .catch(console.log)
}

likeAndDislike("60eb24bd892feb1190a3b378", "60eafb13d954352498ebad6a")

// query trong bài post ai đã like  

function findLikes(postId){

    Post
        .findById(postId)
        .then((post) => {
            if(!post){
                return console.log("post doesn't exist")
            } else {

                for(let i = 0; i < post.likes.length; i++){

                    const userId = post.likes[i].userId;
                        User
                            .findById(userId)
                            .then(console.log)
                            .catch(console.log)
                }
            }
        })
}

findLikes("60eb24bd892feb1190a3b378")