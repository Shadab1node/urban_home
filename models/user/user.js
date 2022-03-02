const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    number: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: Object,
    },
    image: {
        type: String
    }
},
    {
        timestamps: true
    }
)
const User = mongoose.model("user", userSchema)
module.exports = User