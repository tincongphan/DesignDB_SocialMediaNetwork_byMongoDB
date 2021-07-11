
const mongoose = require('mongoose');
// load model
const { User } = require('../models/user');
const { Profile } = require('../models/profile');

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })

// create profile

function createProfile(userId, university, major, social, description) {

    User
        .findById(userId)
        .then((user) => {

            if (!user) return console.log("user doesn't exist")   //  user doesn't exist
            if (user.profile) return console.log("profile does exist")  // user exist and exist profile
            // user exist but doesn't have profile. So create new profile
            const newProfile = new Profile({
                university,
                major,
                social,
                description
            })
            user.profile = newProfile;
            return user.save()
        })
        .then(console.log)
        .catch((error) => {
            console.log(error)
        })
}

createProfile(
    "60eaedc49d16832f8cbc127f",
    ["Cybersoft acedamy"],
    ["web", "mobile"],
    {
        facebook: "teo.fb",
        instagram: null
    },
    "I'm a web deverloper"
)

// update profile

function updateProfile(userId, university, major, social, description) {
    User
        .findById(userId)
        .then((user) => {
            if (!user) return console.log("user doesn't exist")
            if (!user.profile) return console.log("profile doesn't exist")
            const newProfile = new Profile({
                university, major, social, description
            })
            user.profile = newProfile;
            return user.save()
        })
        .then(console.log)
        .catch(console.log)
}

updateProfile(
    "60eaedc49d16832f8cbc127f",
    ["Cybersoft acedamy", "Arizona"],
    ["Machein learning", "AI"],
    {
        facebook: "tictoker.fb",
        instagram: null
    },
    "I'm a data sientist"
)












