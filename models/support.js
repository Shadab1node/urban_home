const mongoose = require("mongoose");
const Schema = mongoose.Schema

const supportSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    notes: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
    {
        timestamps: true
    }
)

const Support = mongoose.model("support", supportSchema)
module.exports = Support