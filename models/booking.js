const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: "service"
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "address"
    }
},
    {
        timestamps: true
    }
)

const Booking = mongoose.model("booking", bookingSchema)
module.exports = Booking
