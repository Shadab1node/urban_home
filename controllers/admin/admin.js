require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("../../models/admin/admin")
const Otp = require("../../models/otp")

const createToken = (admin) => {
    return jwt.sign({ admin }, process.env.PROCESS_KEY, {
        expiresIn: "7d",
    });
};

// ADMIN-RIGISTER

// exports.addadmin = async (req, res) => {
//     try {
//         const admin = new Admin(req.body)
//         admin.save()
//         return res.status(200).json({ msg: "admin add successfuly" })
//     } catch (error) {
//         return res.status(200).json({ msg: "someething went wrong" })
//     }
// }

// ADMIN LOGIN

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            const matched = await bcrypt.compare(password, admin.password);
            if (matched) {
                const token = createToken(admin);
                return res
                    .status(200)
                    .json({ msg: "You have login successfully", token, admin });
            } else {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "Password is not correct" }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: "Email not found" }] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};


// ADMIN MAIL SEND

exports.adminmailsend = async (req, res) => {
    const { email } = req.body;
    if (email === "") {
        res.status(500).json({ msg: "Email is required" });
    } else {
        try {
            const checkUser = await Admin.findOne({ email });
            if (checkUser) {
                let otpData = new Otp({
                    email,
                    otp: Math.floor(100000 + Math.random() * 900000),
                });

                let optResponse = await otpData.save();
                mailer(email, otpData.otp);
                return res.status(200).json({ msg: "OTP sended to your mail" });
            } else {
                return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: error });
        }
    }
};

const mailer = (email, otp) => {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shadabakhtar476@gmail.com",
            pass: "razaraza",
        },
    });
    var mailOptions = {
        from: "shadabakhtar476@gmail.com",
        to: email,
        subject: "OTP mail",
        text: otp,
    };
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

exports.adminforgotpassword = async (req, res) => {
    var { email, otp } = req.body;
    let code = await Otp.find({ email: email, otp: otp });
    if (code) {
        let currentTime = new Date().getTime();
        let diff = code.expireIn - currentTime;
        if (diff < 0) {
            return res.status(400).json({ errors: [{ msg: "Token expire" }] });
        } else {
            var email = req.body.email;
            let user = await Admin.findOne({ email });
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            user.password = hash;

            const OTPDelete = await Otp.deleteMany({
                email: email
            })
            user.save();
            return res.status(200).json({ msg: "Password changes successfully" });
        }
    } else {
        return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
};