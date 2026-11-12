require("dotenv").config(); // MUST be first

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ielts-agent")
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => console.error("Connection error:", err));

module.exports = mongoose;
