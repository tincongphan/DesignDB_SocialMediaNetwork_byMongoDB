


const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    university: { type: [String] },
    major: { type: [String] },
    social: {
        facebook: { type: String },
        instagram: { type: String }
    },
    description: { type: String },
})

// defind model
const Profile = new mongoose.model("Profile", profileSchema)

module.exports = {
    profileSchema,
    Profile
}