const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.gwv60.mongodb.net/Urban_Home",
    {
        useNewUrlParser: true,
    }
);
var db = mongoose.connection;
if (!db) console.log("Error connecting db");
else console.log("Database connected successfully");
