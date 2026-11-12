const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../FrontPage/Backend/models/User");
const TestQuestions = require("../models/testQuestion");
const { loginUser } = require("../controllers/authController");
const adminAuth = require("../middleware/adminAuthMiddleware");
const { route } = require("./auth");
const { config, env } = require("process");
require("dotenv").config();

router.get("/listening", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(
      302,
      `${process.env.R2_PUBLIC_URL}/videos/WhatsApp%20Video%202025-05-05%20at%205.02.30%20PM.mp4`,
    );
  }
  const rootDir = process.env.ROOT_PATH || process.cwd();
  const filePath = path.join(
    rootDir,
    "videos/WhatsApp Video 2025-05-05 at 5.02.30 PM.mp4",
  );
  res.sendFile(filePath);
});

router.get("/reading", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(302, `${process.env.R2_PUBLIC_URL}/videos/reading.mp4`);
  }
  const rootDir = process.env.ROOT_PATH || process.cwd();
  const filePath = path.join(rootDir, "videos/reading.mp4");
  res.sendFile(filePath);
});

router.get("/writing", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(302, `${process.env.R2_PUBLIC_URL}/videos/writing.mp4`);
  }
  const rootDir = process.env.ROOT_PATH || process.cwd();
  const filePath = path.join(rootDir, "videos/writing.mp4");
  res.sendFile(filePath);
});

module.exports = router;
