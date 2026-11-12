const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../FrontPage/Backend/models/User");
const CandidateAccount = require("../models/CandidateAccount");
const { calculateBand, calculateOverallBand } = require("../services/ieltsCalculator");
const TestQuestions = require("../models/testQuestion");
const AdminNotifs = require("../models/notification_for_admin");
const SpeakingBookings = require("../models/speaking_slots");
const passCodes = require("../models/passcodes");
const { loginUser } = require("../controllers/authController");
const adminAuth = require("../middleware/adminAuthMiddleware");
const { route } = require("./auth");

//image routes

router.get("/image/premium-map-1-00", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(302, `${process.env.R2_PUBLIC_URL}/Image/premium-map-1.png`);
  }
  res.sendFile(path.join(__dirname, "../premium-images/premium-map-1.png"));
});

router.get("/image/premium-writing-1-00", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(302, `${process.env.R2_PUBLIC_URL}/Image/premium-writing-1.png`);
  }
  res.sendFile(path.join(__dirname, "../premium-images/premium-writing-1.png"));
});

router.get("/image/premium-writing-2-00", (req, res) => {
  if (process.env.R2_PUBLIC_URL) {
    return res.redirect(302, `${process.env.R2_PUBLIC_URL}/Image/premium-writing-2.png`);
  }
  res.sendFile(path.join(__dirname, "../premium-images/premium-writing-2.png"));
});

router.get("/user-data", async (req, res) => {
  if (req.session.candidate) {
    //res.json({username: req.session.user.username, email: req.session.user.email, phone: req.session.user.phone, plan: req.session.user.plan, mockInformation: req.session.user.mockInformation})
    try {
      const user = await User.findOne({
        passcode: req.session.candidate.passcode,
      });
      if (!user) {
        res.status(401);
      } else {
        const username = user.username;
        const pass = user.passcode;

        res.json({ username: username, pass: pass });
      }
    } catch (err) {
      console.error("Error in user: ", err);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.get("/mockTest", (req, res) => {
  if (req.session.mock) {
    res.json({
      mockNumber: req.session.mock.mockNumber,
      listening: req.session.mock.listening,
      reading: req.session.mock.reading,
      writing: req.session.mock.writing,
    });
  } else {
    res.status(401).send("error");
  }
});

router.post("/update-mock-info", async (req, res) => {
  const { score, mistakes, mod, writingInputs } = req.body;
  if (!score || !mistakes) {
    res.status(401).send("Could not receive score or mistakes");
  }
  console.log(mistakes);
  if (req.session.candidate) {
    console.log("User info check");
    console.log(req.session.candidate.username);
    try {
      const user = await User.findOne({
        username: req.session.candidate.username,
        passcode: req.session.candidate.passcode,
      });
      if (!user) {
        return res.status(401).send("Could not find user");
      }
      if (!Array.isArray(user.mockInformation)) {
        user.mockInformation = [];
      }
      const foundID = user.mockInformation.find(
        (obj) => obj.mockID === req.session.mock.mockNumber,
      );
      if (foundID) {
        const foundIDX = user.mockInformation.indexOf(foundID);
        //console.log(foundID, foundIDX);
        user.mockInformation[foundIDX].completed = true;
        if (mod == "reading") {
          user.mockInformation[foundIDX].reading = {
            score: score,
            mistakes: mistakes,
          };

          //console.log(user.mockInformation[foundIDX]);
        }

        if (mod == "writing") {
          user.mockInformation[foundIDX].writing = {
            writingInputs: writingInputs,
          };

          const newNotif = new AdminNotifs({
            username: req.session.candidate.username,
            passcode: req.session.candidate.passcode,
            mockNumber: req.session.mock.mockNumber,
            organization: req.session.candidate.organization,
            time: new Date(),
          });
          await newNotif.save();

          user.status = "USED";
        }
      } else if (!foundID) {
        if (mod == "listening") {
          user.mockInformation.push({
            mockID: req.session.mock.mockNumber,
            listening: {
              score: score,
              mistakes: mistakes,
            },
          });
        }
      }
      user.markModified("mockInformation");
      await user.save();

      // Sync test result into CandidateAccount
      try {
        const candAcc = await CandidateAccount.findOne({
          $or: [
            { candidateId: req.session.candidate.username },
            { phone: req.session.candidate.username },
            { "passcodes.code": req.session.candidate.passcode }
          ]
        });

        if (candAcc) {
          const currentMockID = req.session.mock.mockNumber;
          const currentPasscode = req.session.candidate.passcode;

          let candRes = candAcc.results.find(
            (r) => r.mockID === currentMockID && r.passcode === currentPasscode
          );

          if (!candRes) {
            candAcc.results.push({
              mockID: currentMockID,
              passcode: currentPasscode,
              testDate: new Date(),
              testType: "ACADEMIC"
            });
            candRes = candAcc.results[candAcc.results.length - 1];
          }

          if (mod === "listening") {
            const raw = parseInt(score, 10) || 0;
            candRes.listeningRaw = raw;
            candRes.listeningBand = calculateBand(raw, "LIS", candRes.testType);
            candRes.listeningMistakes = mistakes || [];
          }

          if (mod === "reading") {
            const raw = parseInt(score, 10) || 0;
            candRes.readingRaw = raw;
            candRes.readingBand = calculateBand(raw, "REA", candRes.testType);
            candRes.readingMistakes = mistakes || [];
          }

          if (mod === "writing") {
            candRes.writingInputs = writingInputs || {};
          }

          // Recalculate Overall Band if speakingBand exists
          if (candRes.speakingBand) {
            const { overallBand, cefrLevel } = calculateOverallBand(
              candRes.listeningBand,
              candRes.readingBand,
              candRes.writingBand,
              candRes.speakingBand
            );
            candRes.overallBand = overallBand;
            candRes.cefrLevel = cefrLevel;
          }

          await candAcc.save();
        }
      } catch (syncResultErr) {
        console.error("Sync to CandidateAccount results error:", syncResultErr);
      }

      res.status(200);
    } catch (err) {
      res.status(401);
      console.error(err);
    }
  }
  if (req.session.mock) {
    console.log("Mock info Check");
    console.log(req.session.mock.mockNumber);
  }
});

router.post("/send-user-for-update", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
  } else {
    req.session.user = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      plan: user.plan,
      mockInformation: user.mockInformation,
    };
  }

  res.redirect("/admin/update-profile");
});

router.get("/user-information-for-admin", (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      email: req.session.user.email,
      phone: req.session.user.phone,
      plan: req.session.user.plan,
      mockInformation: req.session.user.mockInformation,
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.get("/user-information-for-admin-better", async (req, res) => {
  const { email } = req.query;
  console.log(email);
  const user = await User.find({ email: email });
  if (!user) {
    console.log("Bruh");
    res.status(500);
  } else {
    res.json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      plan: user.plan,
      mockInformation: user.mockInformation,
    });
  }
  res.end();
});

router.get("/notification-information-for-admin", async (req, res) => {
  try {
    const notifications = await AdminNotifs.find({});

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching Notifications: ", error);
  }
});

//speaking test
router.post("/add-speaking-test-booking", async (req, res) => {
  const { username, plan, email, bookingsLeft, speaking_dates } = req.body;
  console.log(username, plan, email, bookingsLeft, speaking_dates);
  if (!username || !plan || !email || !speaking_dates) {
    console.log("failed");
    return res.status(400);
  }

  try {
    const newBooker = new SpeakingBookings({
      username,
      plan,
      email,
      bookingsLeft,
      speaking_dates,
    });
    await newBooker.save();
    console.log("User added");
    res.status(200);
    //user not getting added
  } catch (err) {
    res.status(500).send("Error adding booking: " + err.message);
  }
});
router.post("/update-speaking-test-booking", async (req, res) => {
  const { username, plan, email, bookingsLeft, speaking_dates } = req.body;
  try {
    const user = await SpeakingBookings.findOne({ email: email });
    if (!user) {
      res.status(401).send("User not found");
    }
    user.bookingsLeft = bookingsLeft;
    user.speaking_dates.push({
      testId: speaking_dates[0].testId,
      date: speaking_dates[0].date,
      time: speaking_dates[0].time,
      completed: speaking_dates[0].completed,
    });
    user.markModified("speaking_dates");
    await user.save();
    res.status(200);
  } catch (err) {
    res.status(401);
    console.error(err);
  }

  console.log(username, plan, email, bookingsLeft, speaking_dates);
});

router.get("/speaking-booking-data", async (req, res) => {
  const data = await SpeakingBookings.find();
  res.json(data);
});

//check passcode
router.post("/submit-passcode", async (req, res) => {
  const { candidateID, passcode, mockID } = req.body;

  if (!candidateID || !passcode || !mockID) {
    return res.status(400).send("Missing candidateID, passcode or mockID");
  }

  const cleanCand = String(candidateID).trim();
  const cleanPass = String(passcode).trim();
  const cleanMock = String(mockID).trim();

  // Match User with both username and passcode first, or by username, or CandidateAccount
  const candidate =
    (await User.findOne({ username: cleanCand, passcode: cleanPass })) ||
    (await User.findOne({ username: cleanCand })) ||
    (await CandidateAccount.findOne({ candidateId: cleanCand }));

  const passCode = await passCodes.findOne({ pass: cleanPass });
  const testQuestion = await TestQuestions.findOne({ mockNumber: cleanMock });

  if (!passCode) {
    // Check if passcode was already used in User or CandidateAccount
    const usedUser = await User.findOne({
      $or: [
        { passcode: cleanPass, status: "USED" },
        { passcode: cleanPass, "mockInformation.0": { $exists: true } }
      ]
    });
    const usedCand = await CandidateAccount.findOne({
      "passcodes": { $elemMatch: { code: cleanPass, status: "Used" } }
    });
    if (usedUser || usedCand) {
      return res.status(400).send("THIS PASSCODE HAS ALREADY BEEN USED");
    }
    return res.status(400).send("INVALID CANDIDATE OR PASSCODE");
  }

  if (!candidate) {
    return res.status(400).send("INVALID CANDIDATE OR PASSCODE");
  }

  if (!testQuestion) {
    return res.status(404).send("Mock test not found");
  }

  // Determine passcode plan type (from passCodes collection or CandidateAccount)
  let passcodePlan = passCode.planType || "Free";
  let candAcc = null;

  try {
    candAcc = await CandidateAccount.findOne({
      $or: [{ candidateId: cleanCand }, { "passcodes.code": cleanPass }]
    });
    if (candAcc) {
      const pObj = candAcc.passcodes.find((p) => p.code === cleanPass);
      if (pObj) {
        passcodePlan = pObj.planType || passcodePlan;
        if (pObj.status === "Used") {
          return res.status(400).send("THIS PASSCODE HAS ALREADY BEEN USED");
        }
      }
    }
  } catch (errSync) {
    console.error("CandidateAccount check error:", errSync);
  }

  // STRICT ENFORCEMENT:
  // 1. Premium Test requires Premium Passcode
  // 2. Free Test requires Free (or Premium) Passcode
  const isPremiumTest = (testQuestion.plan === "Premium");
  const isPremiumPasscode = (passcodePlan === "Premium" || candidate.level === "Premium");

  if (isPremiumTest && !isPremiumPasscode) {
    return res.status(403).send("THIS IS A PREMIUM TEST. A PREMIUM PASSCODE IS REQUIRED.");
  }

  // Set candidate session
  req.session.candidate = {
    username: candidate.username || candidate.candidateId || candidateID,
    passcode: passCode.pass,
    organization: candidate.organization || "UKA Technical",
  };

  // Mark in CandidateAccount as Used (ONE-TIME ONLY)
  if (candAcc) {
    const pObj = candAcc.passcodes.find((p) => p.code === passcode);
    if (pObj) {
      pObj.status = "Used";
      pObj.mockID = mockID;
      pObj.usedAt = new Date();
      await candAcc.save();
    }
  }

  // Delete from one-time passcodes pool immediately so it cannot be used again
  await passCodes.deleteOne({ pass: passcode });

  return res.redirect("/mock-test");
});

router.get("/pracDataListening", (req, res) => {
  if (req.session.pracListening) {
    res.json({
      pracNumber: req.session.pracListening.pracNumber,
      plan: req.session.pracListening.plan,
      listening: req.session.pracListening.listening,
      type: req.session.pracListening.type,
    });
  } else {
    res.status(401).send("error LOL");
  }
});

router.get("/pracDataReading", (req, res) => {
  if (req.session.pracReading) {
    res.json({
      pracNumber: req.session.pracReading.pracNumber,
      plan: req.session.pracReading.plan,
      reading: req.session.pracReading.reading,
      type: req.session.pracReading.type,
    });
  } else {
    res.status(401).send("error LOL");
  }
});

router.get("/pracDataWriting", (req, res) => {
  if (req.session.pracWriting) {
    res.json({
      pracNumber: req.session.pracWriting.pracNumber,
      plan: req.session.pracWriting.plan,
      writing: req.session.pracWriting.writing,
      type: req.session.pracWriting.type,
    });
  } else {
    res.status(401).send("error LOL");
  }
});
module.exports = router;
