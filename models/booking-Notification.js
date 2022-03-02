const mongoose=require("mongoose")
const Schema=mongoose.Schema

const bookingMotificationSchema=new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    bookingNotification:{
        type:String
    }
},
{
    timestamps:true
})

const Notification=mongoose.model("notification",bookingMotificationSchema)
module.exports=Notification