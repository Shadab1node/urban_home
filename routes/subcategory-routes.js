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
const Controller = require("../controllers/subcategoryController")
const auth = require("../middleware/auth")

router.route("/addsubcategory").post(auth.adminloggedIn, image.single("image"), Controller.addsubcategory)
router.route("/getsubcategory").get(Controller.getsubcategory)
router.route("/updatesubcategory/:id").put(image.single("image"), Controller.updatesubcategory)
router.route("/deletesubcategory").delete(auth.adminloggedIn, Controller.deletesubcategory)
router.route("/getsubcategorybycategory/:id").get(Controller.getsubcategorybycategory)


module.exports = router



