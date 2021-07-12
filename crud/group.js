
const mongoose = require('mongoose');
const { Group } = require('../models/group');
// load model
const { User } = require("../models/user")

mongoose.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected success")
    })
    .catch((error) => {
        console.log(error)
    })


// create group

function createGroup(name, description) {
    const newGroup = new Group({
        name,
        description
    })
    newGroup.save()
        .then(console.log)
        .catch(console.log)
}

createGroup("student discuss", "talk about mongoose")

// update group --> add userId to group, add groupId to user

function updateGroup(userId, groupId) {
    Group
        .findById(groupId)
        .then((group) => {
            if (!group) {
                return console.log("group doesn't exist")
            } else {
                let index = -1;
                //  user already existed in group
                for (let i = 0; i < group.userIds.length; i++) {
                    if (group.userIds[i].equals(userId)) {
                        index = i;
                        return console.log("user had already existed in group")
                    }
                }
                // user doesn't exist in group. push userId to group and push groupId to user
                if (index === -1) {
                    group.userIds.push(userId)
                    group.save()
                        .then((group) => {
                            // add groupId to user
                            User
                                .findById(userId)
                                .then(user => {
                                    user.groupId.push(group._id)
                                    return user.save()
                                })
                                .then(console.log)
                                .catch(console.log)
                        })
                        .catch(console.log)
                }
            }
        })
        .catch(console.log)
}

updateGroup("60eaedc49d16832f8cbc127f", "60ec077bf1c1b9159068667b")
