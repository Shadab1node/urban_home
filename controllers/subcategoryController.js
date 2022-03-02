const Subcategory = require("../models/sub-category")

// ---ADD---SUB---CATEGORY---

exports.addsubcategory = async (req, res) => {
    try {
        subcategoryImage = req.file ? req.file.filename : null;
        const subcategory = new Subcategory(req.body)
        subcategory.admin = req.admin._id
        subcategory.image = subcategoryImage
        subcategory.save()
        return res.status(200).json({ msg: "subcategory Added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//---GET---SUB---CATEGEORY

exports.getsubcategory = async (req, res) => {
    try {
        const getsubcategory = await Subcategory.find({})
        return res.status(200).json({ msg: "subcategory get successfulley", getsubcategory })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//----UPDATE----SUB----CATEGORY

exports.updatesubcategory = async (req, res) => {
    try {
        const name = req.body.name;
        const CategoryImage = req.file ? req.path.filename : null;
        const updatesubcategory = await Subcategory.findByIdAndUpdate(req.params.id, {
            name,
            image: CategoryImage
        })
        return res.status(200).json({ msg: "subcategory update successfulley", updatesubcategory })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ----DELETE----SUB----CATEGORY

exports.deletesubcategory = async (req, res) => {
    try {
        const deletesubcategory = await Subcategory.deleteOne({ admin: req.admin._id })
        return res.status(200).json({ msg: "subcategory delete successfulley", deletesubcategory })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --GET---SUB--CATEGORY--By---CATEGORY-ID

exports.getsubcategorybycategory = async (req, res) => {
    try {
        const getsubcategorybycategory = await Subcategory.find({
            category: req.params.id
        })
        return res.status(200).json({ msg: "subcategory get by category id successfulley", getsubcategorybycategory })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}