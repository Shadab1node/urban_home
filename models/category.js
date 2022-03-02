const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    categoryname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Category = mongoose.model("category", categorySchema)
module.exports = Category