const Review = require("../models/reviewModel")

// ---AADD-REVIEW

exports.addreview = async (req, res) => {
    try {
        const review = new Review(req.body);
        review.user = req.user._id
        review.save()
        return res.status(200).json({ msg: "review add successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ---GET---REVIEW---

exports.getreview = async (req, res) => {
    try {
        const getreview = await Review.find({})
            .populate("user", "name image")
        console.log(getreview)
        return res.status(200).json({ msg: "review get successfully", getreview })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ---DELETE---REVIEW---

exports.deletereview = async (req, res) => {
    try {
        const deleteservice = await Review.deleteOne({})
        console.log(deleteservice)
        return res.status(200).json({ msg: "delete service successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ---> GET <---> ALL <---> REVIEW <----


exports.getallreview = async (req, res) => {
    try {
        const getreview = await Review.find({})
            .populate("user", "name image")
        console.log(getreview)
        return res.status(200).json({ msg: "review get successfully", getreview })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}