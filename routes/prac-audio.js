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

const getAudioPath = (relPath) => {
  if (process.env.R2_PUBLIC_URL) {
    const cleanPath = relPath.startsWith("/") ? relPath.substring(1) : relPath;
    return `${process.env.R2_PUBLIC_URL}/${encodeURI(cleanPath)}`;
  }
  return relPath;
};

router.get("/", (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;
  console.log(pracNumber);
  if (type == "Note-Completion") {
    console.log("lolo");
    if (pracNumber == "Practice-1") {
      return res.json({ src: getAudioPath("/audios-practice/Note Completions/1.mp3") });
    }
    if (pracNumber == "Practice-2") {
      return res.json({ src: getAudioPath("/audios-practice/Note Completions/2.mp3") });
    }
    if (pracNumber == "Practice-3") {
      return res.json({ src: getAudioPath("/audios-practice/Note Completions/3.mp3") });
    }
    if (pracNumber == "Practice-4") {
      return res.json({ src: getAudioPath("/audios-practice/Note Completions/4.mp3") });
    }
    if (pracNumber == "Practice-5") {
      return res.json({ src: getAudioPath("/audios-practice/Note Completions/5.mp3") });
    }
  }
  if (type == "Map Labelling") {
    if (pracNumber == "Practice-1") {
      return res.json({ src: getAudioPath("/audios-practice/Map Lebeling/1.mp3") });
    }
    if (pracNumber == "Practice-2") {
      return res.json({ src: getAudioPath("/audios-practice/Map Lebeling/2.mp3") });
    }
    if (pracNumber == "Practice-3") {
      return res.json({ src: getAudioPath("/audios-practice/Map Lebeling/3.mp3") });
    }
    if (pracNumber == "Practice-4") {
      return res.json({ src: getAudioPath("/audios-practice/Map Lebeling/4.mp3") });
    }
    if (pracNumber == "Practice-5") {
      return res.json({ src: getAudioPath("/audios-practice/Map Lebeling/5.mp3") });
    }
  }
  if (type == "Matching") {
    console.log("matching");
    if (pracNumber == "Practice-1") {
      return res.json({ src: getAudioPath("/audios-practice/Matching/1.mp3") });
    }
  }
  if (type == "Form-Completion") {
    if (pracNumber == "Practice-1") {
      return res.json({ src: getAudioPath("/audios-practice/Form Completions/1.mp3") });
    }
    if (pracNumber == "Practice-2") {
      return res.json({ src: getAudioPath("/audios-practice/Form Completions/2.mp3") });
    }
    if (pracNumber == "Practice-3") {
      return res.json({ src: getAudioPath("/audios-practice/Form Completions/3.mp3") });
    }
  }
  res.status(404).send("Practice audio not found");
});

const practice_audio = (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;
  console.log(pracNumber);
  if (type == "Note-Completion") {
    console.log("lolo");
    if (pracNumber == "Practice-1") {
      res.json({ src: "/audios-practice/Note Completions/1.mp3" });
      res.end();
    }
  }
  if (type == "Matching") {
    console.log("matching");
    if (pracNumber == "Practice-1") {
      res.json({ src: "/audios-practice/Matching/1.mp3" });
    }
  }
};

module.exports = router;
