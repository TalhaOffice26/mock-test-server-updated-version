const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../FrontPage/Backend/models/User");
const TestQuestions = require("../models/testQuestion");
const SpeakingBookings = require("../models/speaking_slots");
const Notifications = require("../models/notification_for_admin");
const passCodes = require("../models/passcodes");
const AddAdmin = require("../models/admin_orgs");
const { loginUser } = require("../controllers/authController");
const adminAuth = require("../middleware/adminAuthMiddleware");
const { default: mongoose } = require("mongoose");

function generateRandomStrings(number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/";
  const strings = [];

  for (let i = 0; i < number; i++) {
    let str = "";
    for (let j = 0; j < 12; j++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    strings.push(str);
  }

  return strings;
}

router.get("/", (req, res) => {
  if (!req.session || !req.session.admin) {
    return res.redirect("/authority_login");
  }
  res.sendFile(path.join(__dirname, "../public/admin_for_orgs.html"));
});

router.get("/get_data", async (req, res) => {
  if (req.session && req.session.admin) {
    try {
      const adminData = await AddAdmin.findOne({
        admin_name: req.session.admin.admin_name,
      });

      if (!adminData) {
        return res.status(404).json({ error: "Admin not found" });
      }

      return res.json({
        admin_name: adminData.admin_name,
        admin_pass: adminData.admin_password,
        admin_limit: adminData.admin_limit,
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error", message: err.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized", redirect: "/authority_login" });
  }
});

router.post("/check_admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing Fields");
  }

  const newAdmin = await AddAdmin.findOne({
    admin_name: username,
    admin_password: password,
  });

  if (!newAdmin) {
    res.status(500).send("Error finding Admin");
  } else {
    req.session.admin = {
      admin_name: newAdmin.admin_name,
      admin_pass: newAdmin.admin_password,
    };

    res.redirect("/admin_orgs");
  }
});

router.post("/updateAdminLimit", async (req, res) => {
  const { adminName, generateAmount } = req.body;
  const admin = await AddAdmin.findOne({ admin_name: adminName });

  try {
    admin.admin_limit = admin.admin_limit - generateAmount;

    await admin.save();
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

router.post("/generate_pass", async (req, res) => {
  const { org_name, passcode } = req.body;

  if (!org_name || !passcode) {
    console.error("Missing Info");
    return res.status(400);
  }

  const finalPasscode = `${org_name}-${passcode}`;

  try {
    const newPass = new passCodes({
      organization: org_name,
      pass: finalPasscode,
    });
    await newPass.save();
    res.end();
  } catch (err) {
    console.log(err);
  }
});

router.get("/view_passcodes", async (req, res) => {
  const organization = req.query.organization;

  try {
    const passcodes = await passCodes.find({
      organization: organization,
      status: undefined,
    });
    return res.json(passcodes);
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
});

router.get("/view_all_passcodes", async (req, res) => {
  const organization = req.query.organization;

  try {
    const passcodes = await passCodes.find({ organization: organization });
    return res.json(passcodes);
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
});

router.get("/view_assigned_passcodes", async (req, res) => {
  const organization = req.query.organization;

  try {
    const users = await User.find({ organization: organization });
    return res.json(users);
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
});

router.get("/users", async (req, res) => {
  const org_name = req.query.org;

  const users = await User.find({ organization: org_name });

  res.json(users);
});

router.get("/user-updates", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin_for_orgs_update.html"));
});

router.post("/assign_candidate", async (req, res) => {
  const { username, passcode, organization, level } = req.body;

  if (!username || !passcode || !organization) {
    res.status(500).send("Incomplete fields");
  } else {
    try {
      const newCandidate = new User({
        username: username,
        passcode: passcode,
        organization: organization,
        level: level,
        time: new Date(),
      });

      await newCandidate.save();

      const pass = await passCodes.findOne({ pass: passcode });

      pass.status = "Assigned";

      await pass.save();
      res.status(200).send("Candidate Assigned Successfully");
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/view_candidates", async (req, res) => {
  const organization = req.query.organization;
  const candidates = await User.find({ organization: organization });
  if (candidates) {
    res.json(candidates);
    res.status(200);
  } else {
    res.status(500).send("ISSUE IN VIEWING USERS");
  }
});

router.post("/redirect_to_results", async (req, res) => {
  const { passcode } = req.body;

  if (!passcode) {
    res.status(500).send("error or empty field");
  }

  const candidate = await User.findOne({ passcode: passcode });

  if (!candidate) {
    res.status(401).send("No candidate Found");
  } else {
    req.session.candidate = {
      candidate_ID: candidate.username,
      candidate_pass: candidate.passcode,
    };

    res.redirect("/view_results");
  }
});

router.get("/candidate_mock_data", async (req, res) => {
  if (req.session.candidate) {
    const candidateData = await User.findOne({
      passcode: req.session.candidate.candidate_pass,
    });
    if (!candidateData) {
      res.status(400).send("Error receiving data");
    } else {
      res.json(candidateData);
    }
  }
});

router.get("/notifications", async (req, res) => {
  const organization = req.query.organization;

  const notifs = await Notifications.find({ organization: organization });

  if (!notifs) {
    res.status(400).send("NO notifs found!");
  } else {
    res.json(notifs);
  }
});

router.get("/mock-info", async (req, res) => {
  const mockID = req.query.mockID;
  const testQuestion = await TestQuestions.findOne({ mockNumber: mockID });

  if (!testQuestion) {
    res.status(400).send("NO test question found!");
  } else {
    res.json(testQuestion);
  }
});

module.exports = router;
