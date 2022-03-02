const router=require("express").Router()
const Controller=require("../controllers/notificationController")
const auth=require("../middleware/auth")

router.route("/addnotification").post(auth.userloggedIn,Controller.addNotification)
router.route("/getnotification").get(auth.userloggedIn,Controller.getNotification)
router.route("/deletenotification").delete(auth.userloggedIn,Controller.deletenotification)


module.exports=router