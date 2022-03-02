const mongoose = require("mongoose");
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: {
        type: String
    },
    description: {
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

const Review = mongoose.model("review", reviewSchema)
module.exports = Review