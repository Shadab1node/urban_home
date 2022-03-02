const Booking = require("../models/booking")

// --- > ADD < --- > BOOKING < --- > DETAILS < ----

exports.Booking = async (req, res) => {
    const { date, time } = req.body;
    try {
        const check = await Booking.findOne({ date, time });
        if (check) {
            const matched = await (check.time, check.date);
            if (matched) {
                return res
                    .status(200)
                    .json({ msg: "this slot is already booked" });
            }
        } else {
            const booking = new Booking(req.body)
            booking.user = req.user._id
            booking.save()
            return res.status(200).json({ msg: "booked success" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --- > GET < --- > BOOKING < --- > DETAILS < ----

exports.getbooking = async (req, res) => {
    try {
        const getbooking = await Booking.find({ user: req.user._id })
            .populate("service", "name")
            .populate("address", "houseno State city landmark")
            .populate("user", "name")
        console.log(getbooking)
        return res.status(200).json({ msg: "booking getted", getbooking })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --- > update < --- > BOOKING < --- > DETAILS < ----

exports.updatebooking = async (req, res) => {
    try {
        const { service, date, time } = req.body
        const updatebooking = await Booking.findOneAndUpdate(req.user._id, {
            service,
            date,
            time
        })
        console.log(updatebooking)
        return res.status(200).json({ msg: "booking updated", updatebooking })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// --- > DELETE < --- > BOOKING < --- > DETAILS < ----

exports.deletebooking = async (req, res) => {
    try {
        const deletebooking = await Booking.deleteOne({})
        console.log(deletebooking)
        return res.status(200).json({ msg: "delete booked" })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong " })
    }
}

// --- > GETTING < --- > BOOKING < --- > DETAILS < ---- > --- < FROM ---> NOW

exports.getafterdate = async (req, res) => {
    try {
        const getafterdate = await Booking.find({ date: { $gt: new Date() } })
        console.log(getafterdate)
        return res.status(200).json({ msg: "booking getted greter then present time", getafterdate })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "" })
    }
}

// --- > GETTING < --- > BOOKING < --- > DETAILS < ---- > --- < MORE ---> NOW <---> DATE

exports.getbeforedate = async (req, res) => {
    try {
        const getbeforedate = await Booking.find({ date: { $lt: new Date() } })
        console.log(getbeforedate)
        return res.status(200).json({ msg: "booking getted lesser then present time", getbeforedate })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "" })
    }
}