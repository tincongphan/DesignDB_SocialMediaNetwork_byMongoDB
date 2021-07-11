
const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    userIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Group = new mongoose.model("Group", groupSchema)

module.exports = {
    groupSchema,
    Group
}