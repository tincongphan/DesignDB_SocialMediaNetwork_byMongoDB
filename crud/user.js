
const mongoose = require('mongoose');
// load model
const { User } = require('../models/user');

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })

// create user
function createUser(username, password, email, name, dateOfBirth) {
    // check exist username or email
    User
        .findOne()  // use findOne is faster than find.
        .or([{ username }, { email }])
        .then((user) => {
            if (user) return console.log("Username or Email is exist")
            const newUser = new User({ username, password, email, name, dateOfBirth })
            return newUser.save()
        })
        .then(user => user && console.log(user))
        .catch((error) => {
            console.log(error)
        })
}

createUser(
    "myan",
    "myan123",
    "an@gmail.com",
    "myannguyen",
    "04-30-1976"
)

// update user

function updateUser(id, username, password, email, name, dateOfBirth) {
    User
        .findById(id)
        .then((user) => {
            if (!user) return console.log("User does not exist")
            user.username = username,
                user.password = password,
                user.email = email,
                user.name = name,
                user.dateOfBirth = dateOfBirth

            return user.save()
        })
        .then(console.log)
        .catch(console.log)
}

updateUser(
    "60eaedc49d16832f8cbc127k",
    "tuyetngan",
    "ngan123",
    "ngan@gmail.com",
    "tuyetnganphan",
    "12-22-1977"
)

// delete user

function deleteUser(id) {
    User
        .findByIdAndDelete(id)
        .then(console.log)
        .catch(console.log)
}

deleteUser("60eaf8bccbc24c0e80b5586a")

// detail user
function userDetail(id){
    User
        .findById(id)
        .then((user) => {
            if(!user) return console.log("User does not exist")
            return user
        })
        .then(console.log)
        .catch((error) => {
            console.log(error)
        })
}

userDetail("60eaedc49d16832f8cbc127f")