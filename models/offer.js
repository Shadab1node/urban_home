const mongoose=require("mongoose")
const Schema=mongoose.Schema

const offerSchema=new Schema({
    subcategory:{
        type:Schema.Types.ObjectId,
        ref:"subcategory",
        required:true
    },
    offer:{
        type:String,
        required:true
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"admin",
        required:true
    }
},
{
    timestamps:true
}
)
const Offer=mongoose.model("offer",offerSchema)
module.exports=Offer