const router=require("express").Router()
const Controller=require("../controllers/offerController")
const auth=require("../middleware/auth")

router.route("/offer").post(auth.adminloggedIn,Controller.offer)
router.route("/getoffer").get(auth.adminloggedIn,Controller.getoffer)
router.route("/deleteoffer").delete(auth.adminloggedIn,Controller.deleteoffer)
router.route("/bestoffer").get(Controller.bestoffer)

module.exports=router