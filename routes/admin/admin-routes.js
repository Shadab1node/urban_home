const router = require("express").Router()
const Controller = require("../../controllers/admin/admin")

// router.route("/addadmin").post(Controller.addadmin)
router.route("/adminlogin").post(Controller.adminlogin)
router.route("/adminmailsend").post(Controller.adminmailsend)
router.route("/adminforgotpassword").post(Controller.adminforgotpassword)

module.exports = router