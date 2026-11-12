const mongoose = require('mongoose');

const passcodes_schema = new mongoose.Schema({
    organization: String,
    pass: String,
    status: String,
    planType: { type: String, enum: ["Free", "Premium"], default: "Free" }
});

passcodes_schema.index({ organization: 1, status: 1 });
passcodes_schema.index({ pass: 1 });

module.exports = mongoose.model("Passcodes", passcodes_schema);