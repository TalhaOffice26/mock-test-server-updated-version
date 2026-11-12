const mongoose = require("mongoose");

const speaking_slot_Schema = new mongoose.Schema({
    username: String,
    plan: String,
    email: String,
    bookingsLeft: String,
    speaking_dates: {type: Array, default: undefined}
})

module.exports = mongoose.model("Speaking_Bookings", speaking_slot_Schema);

