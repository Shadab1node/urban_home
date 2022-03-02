const mongoose = require("mongoose");
const Schema = mongoose.Schema

const subcategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    }
},
    {
        timestamps: true
    }
)

const Subcategory = mongoose.model("subcategory", subcategorySchema)
module.exports = Subcategory