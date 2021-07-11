
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/socialMediaNetwork", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected successfully")
    })
    .catch((error) => {
        console.log(error)
    })