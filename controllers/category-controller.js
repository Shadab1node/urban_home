const Category = require("../models/category")

// ADD--CATEGORY--

exports.addcategory = async (req, res) => {
    try {
        const CategoryImage = req.file ? req.file.filename : null;
        const category = new Category(req.body);
        category.admin = req.admin._id
        category.image = CategoryImage
        category.save()
        return res.status(200).json({ msg: "category add successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

//--GET--CATEGORY---

exports.getcategory = async (req, res) => {
    try {
        const getcategory = await Category.find({ user: req.user._id })
        return res.status(200).json({ msg: "category get successfulley", getcategory })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --UPDATE--CATEGORY---

exports.updatecategory = async (req, res) => {
    try {
        const categoryname = req.body.categoryname;
        const CategoryImage = req.file ? req.path.filename : null;
        const updatecategory = await Category.findByIdAndUpdate(req.params.id, {
            categoryname,
            image: CategoryImage
        })
        return res.status(200).json({ msg: "category update successfulley", updatecategory })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}


//--DELETE--CATEGORY---

exports.deletecategory = async (req, res) => {
    try {
        const deletecategory = await Category.deleteOne({ admin: req.admin._id })
        return res.status(200).json({ msg: "category delete successfulley", deletecategory })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}