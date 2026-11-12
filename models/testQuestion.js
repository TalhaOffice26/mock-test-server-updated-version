const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    mockNumber: String,
    plan: String,
    listening: {type: Object, default: undefined},
    reading: {type: Object, default: undefined},
    writing: {type: Object, default: undefined} 
})

module.exports = mongoose.model("Test-Questions", questionSchema);