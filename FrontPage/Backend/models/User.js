const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },

    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },

    resetToken: { type: String },
    resetTokenExpire: { type: Date },

    otp: { type: String },
    otpExpire: { type: Date },

    // 👇 merge fields from second schema if needed
    username: String,
    passcode: String,
    organization: String,
    speakingScores: { type: Array, default: undefined },
    mockInformation: { type: Array, default: undefined },
    time: Date,
    status: String,
    level: String,
  },
  { timestamps: true },
);

userSchema.index({ organization: 1, status: 1, time: -1 });
userSchema.index({ username: 1 });
userSchema.index({ passcode: 1 });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
