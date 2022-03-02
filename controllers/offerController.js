const Offer=require("../models/offer")

// ADD_OFFER

exports.offer=async (req,res)=>{
    try {
        const offer=new Offer(req.body)
        offer.admin=req.admin._id
        offer.save()
        return res.status(200).json({msg:"offer added"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// GET_OFFER

exports.getoffer=async (req,res)=>{
    try {
        const getoffer=await Offer.find({admin:req.admin._id})
        .populate("subcategory","image name")
        console.log(getoffer)
        return res.status(200).json({msg:"get offerd successfully",getoffer})
    } catch (error) {
        console.lo9g(error)
        return res.status(400).json({msg:"somethi9ng went wrong"})        
    }
}

// DELETE_OFFER

exports.deleteoffer=async (req,res)=>{
    try {
        const deleteoffer=await Offer.deleteOne({admin:req.admin._id})
        console.log(deleteoffer)
        return res.status(200).json({msg:"offer deleted"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// BEST_OFFER

exports.bestoffer=async (req,res)=>{
    try {
        const bestoffer=await Offer.find({offer: {$gt: 100,$lt:10 }})
        console.log(bestoffer)
        return res.status(200).json({msg:"Best Offers",bestoffer})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}