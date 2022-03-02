const router = require("express").Router();
const Controller = require("../controllers/addressController")
const auth = require("../middleware/auth")

// ROUTES====

router.route("/addaddress").post(auth.userloggedIn, Controller.addaddress)
router.route("/getaddress").get(auth.userloggedIn, Controller.getaddress)
router.route("/updateaddress/:id").put(Controller.updateaddress)
router.route("/deleteaddress").delete(auth.userloggedIn, Controller.deleteaddress)

module.exports = router