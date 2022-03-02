const router = require("express").Router()
const Controller = require("../controllers/reviewController")
const auth = require("../middleware/auth")

router.route("/addreview").post(auth.userloggedIn, Controller.addreview)
router.route("/getreview").get(auth.userloggedIn, Controller.getreview)
router.route("/getallreview").get(Controller.getallreview)
router.route("/deletereview").delete(Controller.deletereview)

module.exports = router             