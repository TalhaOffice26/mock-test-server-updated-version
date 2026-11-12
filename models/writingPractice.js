const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    pracNumber: String,
    type: String,
    plan: String,
    writing: {type: Object, default: undefined},
})

module.exports = mongoose.model("Writing-Practice", questionSchema);