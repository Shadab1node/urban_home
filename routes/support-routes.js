const router = require("express").Router()
const Controller = require("../controllers/supportController")
const auth = require("../middleware/auth")


router.route("/addsupport").post(auth.userloggedIn, Controller.addsupport)
router.route("/getsupport").get(auth.userloggedIn, Controller.getsupport)
router.route("/deletesupport").delete(auth.userloggedIn, Controller.deletesupport)


module.exports = router