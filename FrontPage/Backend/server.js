const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./models/User.js");
const Contact = require("./models/Contact.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { config, env } = require("process");
require("dotenv").config();

const app = express();
router.use(express.json());
router.use(cors());

// ------------------ MongoDB Connect ------------------

mongoose
  .connect(`${env.MONGO_URI || "mongodb://localhost:27017/ielts-agent"}`)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ------------------ Helper: __dirname for ES Modules ------------------

// ------------------ Nodemailer Setup ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ukaapp60@gmail.com",
    pass: "wboysrvrbkhhqgtu",
  },
});

// ------------------ API Routes ------------------

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required!" });

    if (await User.findOne({ phone }))
      return res.status(400).json({ message: "Phone already registered!" });
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: " Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: "Phone and password required!" });

    const user = await User.findOne({ phone });
    if (!user)
      return res.status(400).json({ message: "Invalid phone or password!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid phone or password!" });

    res.json({
      message: " Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
});

// Profile Update
router.put("/update-profile", async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID missing!" });
    }

    // Check if email already used by someone else
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Check if phone already used by someone else
    const phoneExists = await User.findOne({ phone, _id: { $ne: id } });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone already in use!" });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating profile." });
  }
});

// ------------------ SEND OTP (5 minutes) ------------------
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email not registered!" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send email
    await transporter.sendMail({
      from: "ukaapp60@gmail.com",
      to: email,
      subject: "Your OTP Code (valid 5 minutes)",
      html: `
        <h3>Your password reset OTP</h3>
        <p>Use this code to reset your password. It will expire in 5 minutes.</p>
        <h2>${otp}</h2>
      `,
    });

    res.json({ message: "OTP sent to your email!" });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// ------------------ VERIFY OTP ------------------
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP!" });

    // OTP verified — respond ok
    res.json({ message: "OTP verified!" });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

// ------------------ RESET PASSWORD (after OTP verified) ------------------
router.post("/reset-password-otp", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res
        .status(400)
        .json({ message: "Email and new password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.otp || !user.otpExpire || user.otpExpire < Date.now())
      return res
        .status(400)
        .json({ message: "OTP expired — request a new one" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    // clear otp fields
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// ------------------ Admin APIs ------------------

// Get all users
router.get("/users", async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : "";
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users." });
  }
});

// Get user count
router.get("/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting user count." });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found." });
    res.json({ message: "User deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user." });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true },
    );
    if (!updated) return res.status(404).json({ message: "User not found." });
    res.json({ message: "User updated.", user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user." });
  }
});

// ------------------ Contact APIs ------------------

// Save contact message
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required!" });

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ message: "Server error sending message." });
  }
});

// Get all contact messages
router.get("/admin/contacts", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// Delete a message
router.delete("/admin/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ------------------ Promotional Email ------------------
router.post("/admin/send-promotional-email", async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message)
      return res.status(400).json({ message: "Subject & Message required" });

    const users = await User.find({});
    const emails = users.map((u) => u.email).filter(Boolean);
    if (emails.length === 0)
      return res.status(400).json({ message: "No users to send email" });

    const mailOptions = {
      from: "ukaapp60@gmail.com",
      to: emails,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: `Promotional email sent to ${emails.length} users` });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Failed to send emails" });
  }
});

// ------------------ Serve static frontend ------------------

const frontendPath = path.join(__dirname, "..", "Frontend");

router.use(express.static(frontendPath));

router.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "home.html"));
});

// ------------------ Start server ------------------

/*
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
*/

module.exports = router;
