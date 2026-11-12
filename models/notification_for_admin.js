const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
    username: String,
    passcode: String,
    organization: String,
    mockNumber: String,
    time: Date
})

module.exports = mongoose.model("Admin-Notif", notifSchema);