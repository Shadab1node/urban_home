const req = require("express/lib/request")
const Address = require("../models/address")

// --- > ADD < --- > ADDRESS < --- > DETAILS < ----

exports.addaddress = async (req, res) => {
    try {
        const address = new Address(req.body)
        address.user = req.user._id
        address.save()
        console.log(address)
        return res.status(200).json({ msg: "Address Added" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "something went wrong" })
    }
}


// --- > GEt < --- > ADDRESS < --- > DETAILS < ----

exports.getaddress = async (req, res) => {
    try {
        const getaddress = await Address.find({ user: req.user._id })
        console.log(getaddress)
        return res.status(200).json({ msg: `get address successfully `, getaddress })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --- > UPDATE < --- > ADDRESS < --- > DETAILS < ----

exports.updateaddress = async (req, res) => {
    try {
        const { houseno, state, city, landmark } = req.body;
        const updateaddress = await Address.findByIdAndUpdate(req.params.id, {
            houseno,
            state,
            city,
            landmark
        })
        console.log(updateaddress)
        return res.status(200).json({ msg: `update address successfully `, updateaddress })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --- > DELETE < --- > ADDRESS < --- > DETAILS < ----

exports.deleteaddress = async (req, res) => {
    try {
        const deleteaddress = await Address.deleteOne({ user: req.user._id })
        console.log(deleteaddress)
        return res.status(200).json({ msg: `delete address successfully `, deleteaddress })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}