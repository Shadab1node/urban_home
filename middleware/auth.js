const jwt = require("jsonwebtoken");
const User = require("../models/user/user");
const Admin = require("../models/admin/admin")
// USER---MIDDLEWARE

exports.userloggedIn = async function (req, res, next) {
    try {
        console.log('entered loggedin middleware..................')
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
            return res.status(401).json({
                success: false,
                msg: 'token not provided or user not logged in'
            });
        }

        const token = authHeaderStringSplit[1];
        const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
        console.log(`decoded token: ${decodedToken.user}`)
        const user = await User.findById(decodedToken.user);
        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            })
        }
        console.log(`user name ${user.username}`)
        req.user = user.toObject();
        //delete req.user['password']
        next();

    } catch (err) {
        console.log('error in auth middleware/////////////////////////////////')
        console.log(err)
        if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                msg: 'token expired, please login again'
            })
        }
        next(err);
    }
}
//module.exports = { auth };

// ADMIN---MIDDLEWARE

exports.adminloggedIn = async function (req, res, next) {
    try {
        console.log('entered loggedin middleware..................')
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                msg: 'token not provided or admin not logged in'
            });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
            return res.status(401).json({
                success: false,
                msg: 'token not provided or admin not logged in'
            });
        }

        const token = authHeaderStringSplit[1];
        const decodedToken = await jwt.verify(token, process.env.PROCESS_KEY);
        console.log(`decoded token: ${decodedToken.admin}`)
        const admin = await Admin.findById(decodedToken.admin);
        if (!admin) {
            return res.status(404).json({
                error: 'admin not found'
            })
        }
        req.admin = admin.toObject();
        //delete req.user['password']
        next();

    } catch (err) {
        console.log('error in auth middleware/////////////////////////////////')
        console.log(err)
        if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                msg: 'token expired, please login again'
            })
        }
        next(err);
    }
}