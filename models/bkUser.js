const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    passcode: String,
    organization: String,
    speakingScores: {type: Array, default: undefined},
    mockInformation: {type: Array, default: undefined},
    time: Date,
    status: String,
    level: String

})

module.exports = mongoose.model("User", userSchema);


