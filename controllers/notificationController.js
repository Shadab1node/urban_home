const moment=require("moment")
const Notification=require("../models/booking-Notification")

// ADD_BOOKING_NOTIFICATION

exports.addNotification=async (req,res)=>{
    try {
        const bookingnotification= `Congratulation your booking confirm  on ${moment().format('DD-MM-YYYY')}`
        const notification=new Notification()
        notification.user=req.user._id
        notification.bookingNotification=bookingnotification
        notification.save()
        return res.status(200).json({msg:"Congratulation your booking confirm"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})  
    }
}

// GET_BOOKING_NOTIFICATION

exports.getNotification=async (req,res)=>{
    try {
        const getNotification=await Notification.find({user:req.user._id})
        return res.status(200).json({msg:"booking getted",getNotification})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})  
    }
}

// DELETE_BOOKING_NOTIFICATION

exports.deletenotification = async (req, res) => {
    try {
        const deletenotification = await Notification.deleteOne({user:req.user._id})
        return res.status(200).json({ msg: "notification deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}