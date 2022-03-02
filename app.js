require('dotenv').config();
let express = require("express");
var path = require("path")
let bodyParser = require("body-parser");
require("./config/database")
const twilio = require('twilio');
const cors = require("cors");
let app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES------

let adminRoutes = require("./routes/admin/admin-routes")
let userRoutes = require("./routes/user/user-routes");
let supportRoutes = require("./routes/support-routes")
let categoryRoues = require("./routes/category-routes")
let subcategoryRoutes = require("./routes/subcategory-routes")
let serviceRoutes = require("./routes/servic-routes")
let reviewRoutes = require("./routes/review-routes")
let addressRoutes = require("./routes/address-routes")
let bookingRoutes = require("./routes/booking-routes")
let notificatoinRoutes=require("./routes/notification-routes")
let offerRoutes=require("./routes/offer-routes")

var port = process.env.PORT || 3000;
app.use("/api",
    userRoutes,
    adminRoutes,
    supportRoutes,
    categoryRoues,
    subcategoryRoutes,
    serviceRoutes,
    reviewRoutes,
    addressRoutes,
    bookingRoutes,
    notificatoinRoutes,
    offerRoutes
)
app.listen(port, function () {
    console.log("Running on port " + port);
});
module.exports = app;
