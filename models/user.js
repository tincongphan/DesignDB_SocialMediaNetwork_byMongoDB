
const mongoose = require('mongoose');
const { profileSchema } = require("./profile")
const userSchema = mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    dateOfBirth: { type: Date, require: true },
    registerDate: { type: Date, default: new Date().getTime() },
    //  tech embedding
    profile: {
        type: profileSchema
    },
    //  tech referencing
    groupId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Group"
    }
})

const User = new mongoose.model("User", userSchema)

module.exports = {
    userSchema,
    User
}