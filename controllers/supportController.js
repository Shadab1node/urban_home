const Support = require("../models/support")

// HELP--AND--SUPPORT--

exports.addsupport = async (req, res) => {
    try {
        const support = new Support(req.body)
        support.user = req.user._id
        support.save()
        return res.status(200).json({ msg: "support add successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--HELP--AND--SUPPORT--DETAILS

exports.getsupport = async (req, res) => {
    try {
        const getsupport = await Support.find({ user: req.user._id })
        return res.status(200).json({ msg: "get support detail successfulley", getsupport })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE--HELP--AND--SUPPORT--DETAILS


exports.deletesupport = async (req, res) => {
    try {
        const deletesupport = await Support.deleteOne({ user: req.user._id })
        return res.status(200).json({ msg: "delete support detail successfulley", deletesupport })
    } catch (error) {
        console.log(Error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}