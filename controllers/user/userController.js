const User = require("../../models/user/user")
const Otp = require("../../models/otp")
const twilio = require('twilio');
const sendSms = require("../../twilio")
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
// FOR-TOKEN

const createToken = (user, admin) => {
    return jwt.sign({ user, admin }, process.env.PROCESS_KEY, {
        expiresIn: "7d",
    });
};
// const createToken = (admin) => {
//     return jwt.sign({ admin }, process.env.PROCESS_KEY, {
//         expiresIn: "7d",
//     });
// };

// USER-OTP-SEND-ON-NUMBER

exports.userOtp = async (req, res) => {
    try {
        const statecode = "+91";
        const number = req.body.number;
        const OTP = Math.floor(1000 + Math.random() * 9000)
        let user = await User.findOne({
            number: `${statecode}${number}`

        })
        if (!user) {
            user = new User()
            user.number = `${statecode}${number}`
            await user.save()
        }

        if (user) {
            const otp = new Otp()
            otp.number = `${statecode}${number}`
            otp.otp = OTP
            const result = await otp.save();
        }
        //await user.save()
        const welcomeMessage = ` Please verify Otp And Login: ${OTP}`;
        console.log(welcomeMessage)
        const messageres = await sendSms(user.number, welcomeMessage);
        console.log(messageres)
        return res.status(201).send({
            message: 'Otp send on your number ! Please verify Otp And Login',
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

// VERIFY-OTP-LOGIN

exports.verifyOtp = async (req, res) => {
    try {
        var { number, otp } = req.body;
        let newotp = await Otp.findOne({ number: number, otp: otp });
        if (!newotp) {
            return res.status(400).json({ errors: 'wrong otp' })
        }
        console.log(number)
        if (newotp) {
            var number = req.body.number;
            let user = await User.findOne({ number });
            console.log(user)
            const token = createToken(user);
            const OTPDelete = await Otp.deleteOne({
                number: number
            });
            return res.status(200).json({ msg: "user login successfully", token, user });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
    }
}

// ADD----USER----DETAILS

exports.userdetail = async (req, res) => {
    const number = req.body.number;
    const checkUser = await User.findOne({ number: number });
    if (checkUser) {
        return res.status(400).json({
            errors: [{ msg: "Number is already taken" }]
        });
    }
    const { name, email, address, location } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    try {
        const update = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            address,
            location,
            image: profileImage
        });
        console.log(update)
        if (update) {
            res.json({
                message: " user detail updated successfully",
                data: update,
            });
        }
        else {
            res.json({
                message: "user not update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--USER--

exports.getuser = async (req, res) => {
    try {
        const getuser = await User.find({ user: req.user.id })
        console.log(getuser)
        return res.status(200).json({ msg: "get user successfully", getuser })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// UPDATE--USER--

exports.updateuser = async (req, res) => {
    const { name, email, location, address, } = req.body;
    var url = "http://localhost:2999/api/upload/Image"
    const profileImage = req.file ? req.file.filename : null;
    try {
        const update = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            location,
            address,
            image: `${url}/ ${profileImage}`,
        });
        console.log(update)
        if (update) {
            res.json({
                message: "update user successfully",
                data: update,
            });
        } else {
            res.json({
                message: "user not update",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// DELETE--USER--

exports.deleteuser = async (req, res) => {
    try {
        const deleteuser = await User.findByIdAndDelete(req.user._id,)
        return res.status(200).json({ msg: "delete user successfully", deleteuser })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET--ALL--USER

exports.getalluser = async (req, res) => {
    try {
        const getalluser = await User.find({})
        return res.status(200).json({ msg: "get all user successfully", getalluser })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}