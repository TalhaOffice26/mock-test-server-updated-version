const mongoose = require("mongoose");

const adminForOrgsSchema = new mongoose.Schema({
  admin_name: String,
  admin_password: String,
  admin_limit: Number,
});

module.exports = mongoose.model("Admins", adminForOrgsSchema);
