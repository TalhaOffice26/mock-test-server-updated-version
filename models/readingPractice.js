const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    pracNumber: String,
    type: String,
    plan: String,
    reading: {type: Object, default: undefined},
})

module.exports = mongoose.model("Reading-Practice", questionSchema);