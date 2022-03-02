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

const imageUplods = image.fields([
    { name: 'serviceimage', maxCount: 1 },
    { name: 'includeserviceimage', maxCount: 1 },
]);

const router = require("express").Router()
const Controller = require("../controllers/serviceController")
const auth = require("../middleware/auth")

router.route("/service").post(auth.adminloggedIn, imageUplods, Controller.Service)
router.route("/getservice").get(Controller.getservice)
router.route("/updateservice/:id").put(imageUplods, Controller.updateservice)
router.route("/deleteservice").delete(auth.adminloggedIn, Controller.deleteservice)
router.route("/getsingleservice/:id").get(Controller.getsingleservice)
router.route("/add-favroite/:id").post(Controller.addFavroite);
router.route("/getfav").get(Controller.getfav);

module.exports = router