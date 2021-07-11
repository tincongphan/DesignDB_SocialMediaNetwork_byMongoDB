
const mongoose = require('mongoose');
const likeSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const Like = new mongoose.model("Like", likeSchema)

module.exports = {
    likeSchema,
    Like
}
