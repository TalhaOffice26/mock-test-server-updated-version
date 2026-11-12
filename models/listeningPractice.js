const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    pracNumber: String,
    type: String,
    plan: String,
    listening: {type: Object, default: undefined},
})

module.exports = mongoose.model("Listening-Practice", questionSchema);