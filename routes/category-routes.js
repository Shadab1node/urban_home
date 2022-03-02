const multer = require("multer");
var path = require("path")
var image = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/Image");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
var image = multer({ storage: image });

// ---ROUTES---

const router = require("express").Router()
const Controller = require("../controllers/category-controller")
const auth = require("../middleware/auth")

router.route("/addcategory").post(auth.adminloggedIn, image.single("image"), Controller.addcategory)
router.route("/getcategory").get(auth.userloggedIn, Controller.getcategory)
router.route("/updatecategory/:id").put(image.single("image"), Controller.updatecategory)
router.route("/deletecategory").delete(auth.adminloggedIn, Controller.deletecategory)


module.exports = router



