const mongoose = require("mongoose");
const Schema = mongoose.Schema

const addressSchema = new Schema({
    houseno: {
        type: String
    },
    landmark: {
        type: String
    },
    city: {
        type: String
    },
    State: {
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

const Address = mongoose.model("address", addressSchema)
module.exports = Address