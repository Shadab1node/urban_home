const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "subcategory"
    },
    name: {
        type: String
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    image: {
        type: String
    },
    jobs: {
        type: String,
    },
    rate: {
        type: String
    },
    rating: {
        type: String
    },
    details: {
        type: String
    },
    includeservices: {
        type:
            [{
                title: String,
                image: String,
                description: String
            }],
        default: []
    },
    status: {
        type: String,
        default: "pending"
      },
},
    {
        timestamps: true
    }
)

const Service = mongoose.model("service", serviceSchema)
module.exports = Service