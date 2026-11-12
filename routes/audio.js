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

const AUDIO_ROUTES = {
  // Basic Mocks
  1: "audio/UKA_free.mp3",
  2: "audio/mock-2.mp3",
  3: "audio/mock-3.mp3",
  4: "audio/mock-4.mp3",

  // Cambridge Series
  "cambridge-1": "audio/cambridge-gt-mock-1.mp3",
  "cambridge-2": "audio/cambridge-gt-mock-2.mp3",
  "cambridge-3": "audio/cambridge-ac-mock-3.mp3",
  "cambridge-4": "audio/cambridge-gt-mock-4.mp3",
  "cambridge-5": "audio/cambridge-ac-mock-5.mp3",
  "cambridge-6": "audio/cambridge-ac-mock-6.mp3",
  "cambridge-7": "audio/cambridge-ac-mock-7.mp3",
  "cambridge-8": "audio/cambridge-ac-mock-8.mp3",
  "cambridge-9": "audio/cambridge-ac-mock-9.mp3",
  "cambridge-10": "audio/cambridge-ac-mock-10.mp3",

  // Academic UKA Final Series
  "Academic-UKA-FINAL-1": "audio/MOCK-4-AUDIO-1.MP3",
  "Academic-UKA-FINAL-2": "audio/MOCK-1-AUDIO-2.MP3",
  "Academic-UKA-FINAL-3": "audio/MOCK-11-AUDIO-3.MP3",
  "Academic-UKA-FINAL-4": "audio/MOCK-3-AUDIO-4.MP3",
  "Academic-UKA-FINAL-5": "audio/MOCK-2-AUDIO-5.MP3",
  "Academic-UKA-FINAL-6": "audio/MOCK-22-AUDIO-6.MP3",
  "Academic-UKA-FINAL-7": "audio/MOCK-21-AUDIO-7.MP3",
  "Academic-UKA-FINAL-8": "audio/MOCK-7-AUDIO-8.MP3",
  "Academic-UKA-FINAL-9": "audio/MOCK-8-AUDIO-9.MP3",
  "Academic-UKA-FINAL-10": "audio/MOCK-9-AUDIO-10.MP3",
  "Academic-UKA-FINAL-11": "audio/MOCK-10-AUDIO-11.MP3",
  "Academic-UKA-FINAL-12": "audio/MOCK-1-AUDIO-2.MP3",
  "Academic-UKA-FINAL-13": "audio/MOCK-1-AUDIO-2.MP3",

  // Premium Series
  "Premium-UKA-FINAL-1": "audio/premium/premium-1.mp3",
  "Premium-UKA-FINAL-2": "audio/premium/premium-2.mp3",
  "Premium-UKA-FINAL-3": "audio/premium/premium-3.mp3",
  "Premium-UKA-FINAL-4": "audio/premium/premium-4.mp3",
  "Premium-UKA-FINAL-5": "audio/premium/premium-5.mp3",
  "Premium-UKA-FINAL-6": "audio/premium/premium-6.mp3",
  "Premium-UKA-FINAL-7": "audio/MOCK-1-AUDIO-2.MP3",
  "Premium-UKA-FINAL-8": "audio/premium/premium-8.mp3",
  "Premium-UKA-FINAL-9": "audio/premium/premium-9.mp3",
};
const fs = require("fs");

router.get("/:mockID", (req, res) => {
  const { mockID } = req.params;
  const relativePath = AUDIO_ROUTES[mockID];

  if (!relativePath) {
    return res.status(404).json({ error: "Invalid Audio ID" });
  }

  // Cloudflare R2 Redirect (Fast CDN + Native Range Support)
  if (process.env.R2_PUBLIC_URL) {
    const formattedPath = relativePath.replace(/\\/g, "/");
    const r2Url = `${process.env.R2_PUBLIC_URL}/${formattedPath}`;
    return res.redirect(302, r2Url);
  }

  const rootDir = process.env.ROOT_PATH || process.cwd();
  const filePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(filePath)) {
    console.error(`[AUDIO ERROR] File missing: ${filePath}`);
    return res.status(404).send("Audio file not found on server");
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // Handle Streaming (The "Mismatch" Killer)
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res
        .status(416)
        .send("Requested range not satisfiable\n" + start + " >= " + fileSize);
      return;
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-cache", // Prevents old partial cache issues
    };

    res.writeHead(206, head);

    // Safety: If the student closes the tab or network drops, kill the stream
    file.on("error", (err) => {
      console.error("Stream error:", err);
      res.end();
    });

    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
      "Accept-Ranges": "bytes", // Add this
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
