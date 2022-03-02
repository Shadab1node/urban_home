const router = require("express").Router()
const Controller = require("../controllers/bookingController")
const auth = require("../middleware/auth")

router.route("/Booking").post(auth.userloggedIn, Controller.Booking)
router.route("/getbooking").get(auth.userloggedIn, Controller.getbooking)
router.route("/updatebooking").put(auth.userloggedIn, Controller.updatebooking)
router.route("/deletebooking").delete(auth.userloggedIn, Controller.deletebooking)
router.route("/getafterdate").get(auth.userloggedIn, Controller.getafterdate)
router.route("/getbeforedate").get(auth.userloggedIn, Controller.getbeforedate)

module.exports = router