const express = require("express");
const router = express.Router();
const path = require("path");
const passCodes = require("../models/passcodes");
const User = require("../FrontPage/Backend/models/User");
const AddAdmin = require("../models/admin_orgs");
const TestQuestions = require("../models/testQuestion");
const { calculateBand, calculateOverallBand } = require("../services/ieltsCalculator");
const { evaluateIeltsWriting } = require("../services/aiEvaluationService");

// Helper to generate clean, unambiguous alphanumeric passcodes
function generateRandomStrings(number) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
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

// Session Auth Middleware - Restricted strictly to 'ukatech' (other partner orgs like 'saimons' stay on classic panel)
function requireAdmin(req, res, next) {
  if (req.session && req.session.admin_superAdmin) {
    return next();
  }
  if (req.session && req.session.admin) {
    if (req.session.admin.admin_name === "ukatech") {
      return next();
    }
    // Other partner organizations (e.g. 'saimons') are routed to classic admin panel
    return res.redirect("/admin_orgs");
  }
  if (req.xhr || (req.headers.accept && req.headers.accept.includes("json"))) {
    return res.status(401).json({ error: "Unauthorized", redirect: "/authority_login" });
  }
  return res.redirect("/authority_login");
}

// 1. Serve Glass White Executive Admin Hub
router.get("/", requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin_advanced.html"));
});

// 2. Overview Stats (Real DB Stats from User & Passcodes - Filtered to last 30 days active window)
router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const adminOrg = req.session.admin ? req.session.admin.admin_name : "ukatech";

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const timeFilter = {
      organization: adminOrg,
      $or: [{ time: { $gte: oneMonthAgo } }, { createdAt: { $gte: oneMonthAgo } }]
    };

    const [
      totalAssignedUsers,
      completedTests,
      activePasscodes,
      assignedPasscodes,
      adminData
    ] = await Promise.all([
      User.countDocuments(timeFilter),
      User.countDocuments({ ...timeFilter, status: "USED" }),
      passCodes.countDocuments({ organization: adminOrg, status: undefined }),
      passCodes.countDocuments({ organization: adminOrg, status: "Assigned" }),
      AddAdmin.findOne({ admin_name: adminOrg }).lean()
    ]);

    const adminLimit = adminData ? adminData.admin_limit : 0;

    return res.json({
      adminOrg,
      adminLimit,
      totalAssignedUsers,
      completedTests,
      activePasscodes,
      assignedPasscodes
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 2.1. Top-Up Passcode Quota (Admin Limit) with Security Password
router.post("/topup_limit", requireAdmin, async (req, res) => {
  try {
    const { amount, password } = req.body;
    const addNum = parseInt(amount, 10);
    if (isNaN(addNum) || addNum <= 0) {
      return res.status(400).json({ error: "Please enter a valid positive quota amount to add." });
    }
    if (!password) {
      return res.status(400).json({ error: "Admin security password is required to top up quota." });
    }

    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";
    const admin = await AddAdmin.findOne({ admin_name: org_name });
    if (!admin) {
      return res.status(404).json({ error: "Organization admin record not found." });
    }

    // Verify password against organization admin password or master ADMIN_PASSWORD
    const isMaster = process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
    const isOrgPass = admin.admin_password && password === admin.admin_password;

    if (!isMaster && !isOrgPass) {
      return res.status(403).json({ error: "Incorrect Admin Security Password! Access denied." });
    }

    admin.admin_limit = (admin.admin_limit || 0) + addNum;
    await admin.save();

    return res.json({
      success: true,
      message: `Successfully added ${addNum} to passcode quota! New Limit: ${admin.admin_limit}`,
      newLimit: admin.admin_limit
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 3. Quick Assign Candidate Endpoint
router.post("/quick_assign_candidate", requireAdmin, async (req, res) => {
  try {
    let { name, phone, count, level } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Candidate Name and Phone/WhatsApp are required." });
    }

    name = name.trim();
    phone = phone.trim();
    count = parseInt(count, 10) || 1;
    level = level === "Premium" ? "Premium" : "Free";

    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";

    // Format Candidate ID exactly as classic system expects: org-roll-Name-phoneSuffix
    const phoneSuffix = phone.slice(-4);
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, "");
    const candidateUsername = `${org_name}-roll-${cleanName}-${phoneSuffix}`;

    // Generate random passcodes using the exact original generator
    const randomPassList = generateRandomStrings(count);
    const createdAssignments = [];

    for (let i = 0; i < count; i++) {
      const finalPasscode = `${org_name}-${randomPassList[i]}`;

      // 1. Create in passCodes collection with status = "Assigned"
      const newPass = new passCodes({
        organization: org_name,
        pass: finalPasscode,
        status: "Assigned",
        planType: level
      });
      await newPass.save();

      // 2. Insert Candidate record in User collection
      const newCandidate = new User({
        username: candidateUsername,
        name: name,
        phone: phone,
        passcode: finalPasscode,
        organization: org_name,
        level: level,
        status: undefined,
        time: new Date()
      });
      await newCandidate.save();

      createdAssignments.push({
        candidateID: candidateUsername,
        passcode: finalPasscode,
        level: level
      });
    }

    // Sync to CandidateAccount for unified tracking
    try {
      let candAcc = await CandidateAccount.findOne({ candidateId: candidateUsername });
      if (!candAcc) {
        candAcc = new CandidateAccount({
          candidateId: candidateUsername,
          name: name,
          phone: phone,
          organization: org_name,
          passcodes: []
        });
      }
      for (const item of createdAssignments) {
        candAcc.passcodes.push({
          code: item.passcode,
          planType: item.level,
          status: "Active",
          assignedAt: new Date()
        });
      }
      await candAcc.save();
    } catch (accErr) {
      console.error("CandidateAccount sync notice:", accErr.message);
    }

    // Deduct admin limit if applicable
    const admin = await AddAdmin.findOne({ admin_name: org_name });
    if (admin && admin.admin_limit !== undefined) {
      admin.admin_limit = Math.max(0, admin.admin_limit - count);
      await admin.save();
    }

    return res.json({
      success: true,
      message: `${count} ${level} passcode(s) successfully assigned to ${candidateUsername}!`,
      candidateID: candidateUsername,
      name: name,
      phone: phone,
      level: level,
      assignments: createdAssignments
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 4. View All Candidates Grouped (with status, balance, and mock results) - Filtered to last 30 days active window
router.get("/candidates_list", requireAdmin, async (req, res) => {
  try {
    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";
    const { q } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 10));

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    let filter = {
      organization: org_name,
      $or: [{ time: { $gte: oneMonthAgo } }, { createdAt: { $gte: oneMonthAgo } }]
    };

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      filter = {
        organization: org_name,
        $and: [
          { $or: [{ time: { $gte: oneMonthAgo } }, { createdAt: { $gte: oneMonthAgo } }] },
          { $or: [{ username: regex }, { name: regex }, { phone: regex }, { passcode: regex }] }
        ]
      };
    }

    // Fast lean query with projection
    const records = await User.find(filter)
      .select("username name phone level organization status passcode time mockInformation speakingScores")
      .sort({ time: -1, _id: -1 })
      .lean();

    // Group records by Candidate ID (username)
    const candidateMap = new Map();

    records.forEach((rec) => {
      const id = rec.username || "UNKNOWN";
      if (!candidateMap.has(id)) {
        candidateMap.set(id, {
          candidateID: id,
          name: rec.name || id.replace(`${org_name}-roll-`, ""),
          phone: rec.phone || "",
          level: rec.level || "Free",
          organization: rec.organization,
          lastActiveTime: rec.time || new Date(0),
          passcodes: [],
          results: [],
          totalAssigned: 0,
          usedCount: 0,
          unusedCount: 0
        });
      }

      const cand = candidateMap.get(id);
      if (rec.time && new Date(rec.time) > new Date(cand.lastActiveTime)) {
        cand.lastActiveTime = rec.time;
      }

      const isUsed = rec.status === "USED" || (rec.mockInformation && rec.mockInformation.length > 0);
      cand.totalAssigned++;
      if (isUsed) {
        cand.usedCount++;
      } else {
        cand.unusedCount++;
      }

      cand.passcodes.push({
        passcode: rec.passcode,
        level: rec.level || "Free",
        status: isUsed ? "USED" : "READY",
        time: rec.time
      });

      if (rec.mockInformation && rec.mockInformation.length > 0) {
        rec.mockInformation.forEach((mock) => {
          const lRaw = (mock.listening && mock.listening.score) || 0;
          const rRaw = (mock.reading && mock.reading.score) || 0;
          const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
          const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
          const wBand = mock.writing && mock.writing.band ? mock.writing.band : null;
          const sBand = mock.speakingBand || (rec.speakingScores && rec.speakingScores[0]) || null;

          const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

          cand.results.push({
            userDocId: rec._id,
            mockID: mock.mockID || "Mock Test",
            passcode: rec.passcode,
            time: rec.time,
            listeningRaw: lRaw,
            listeningBand: lBand,
            listeningMistakes: mock.listening ? mock.listening.mistakes : {},
            readingRaw: rRaw,
            readingBand: rBand,
            readingMistakes: mock.reading ? mock.reading.mistakes : {},
            writingBand: wBand,
            writingInputs: mock.writing ? mock.writing.writingInputs : {},
            task1Feedback: mock.task1Feedback || "",
            task2Feedback: mock.task2Feedback || "",
            teacherRecommendation: mock.teacherRecommendation || "",
            speakingBand: sBand,
            overallBand,
            cefrLevel
          });
        });
      }
    });

    // Sort candidates by most recent activity
    const candidateList = Array.from(candidateMap.values()).sort(
      (a, b) => new Date(b.lastActiveTime) - new Date(a.lastActiveTime)
    );

    const totalCandidates = candidateList.length;
    const totalPages = Math.ceil(totalCandidates / limit) || 1;
    const paginated = candidateList.slice((page - 1) * limit, page * limit);

    return res.json({
      candidates: paginated,
      total: totalCandidates,
      page,
      totalPages,
      limit
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. Recent Completed Results (Paginated & Newest First - Filtered to last 30 days active window)
router.get("/recent_results", requireAdmin, async (req, res) => {
  try {
    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 10));

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const filter = {
      organization: org_name,
      status: "USED",
      $or: [{ time: { $gte: oneMonthAgo } }, { createdAt: { $gte: oneMonthAgo } }]
    };

    // Parallel count & projected lean query
    const [totalResults, usedUsers] = await Promise.all([
      User.countDocuments(filter),
      User.find(filter)
        .select("username name phone passcode level time mockInformation speakingScores")
        .sort({ time: -1, _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    const totalPages = Math.ceil(totalResults / limit) || 1;

    const results = usedUsers.map((u) => {
      const mockInfo = (u.mockInformation && u.mockInformation[0]) || {};
      const lRaw = (mockInfo.listening && mockInfo.listening.score) || 0;
      const rRaw = (mockInfo.reading && mockInfo.reading.score) || 0;

      const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
      const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
      const wBand = (mockInfo.writing && mockInfo.writing.band) || 0;
      const sBand = mockInfo.speakingBand || (u.speakingScores && u.speakingScores[0]) || null;

      const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

      return {
        userDocId: u._id,
        candidateID: u.username,
        name: u.name || u.username.replace(`${org_name}-roll-`, ""),
        phone: u.phone || "",
        passcode: u.passcode,
        level: u.level || "Free",
        mockID: mockInfo.mockID || "Mock Test",
        time: u.time,
        listeningRaw: lRaw,
        listeningBand: lBand,
        listeningMistakes: mockInfo.listening ? mockInfo.listening.mistakes : {},
        readingRaw: rRaw,
        readingBand: rBand,
        readingMistakes: mockInfo.reading ? mockInfo.reading.mistakes : {},
        writingBand: wBand,
        speakingBand: sBand,
        overallBand,
        cefrLevel,
        writingInputs: mockInfo.writing ? mockInfo.writing.writingInputs : {},
        task1Feedback: mockInfo.task1Feedback || "",
        task2Feedback: mockInfo.task2Feedback || "",
        teacherRecommendation: mockInfo.teacherRecommendation || ""
      };
    });

    return res.json({
      results,
      total: totalResults,
      page,
      totalPages,
      limit
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 6. Manual Entry for Speaking Band and Writing Band (Instant recalculation & live data return)
router.post("/update_scores", requireAdmin, async (req, res) => {
  try {
    const { userDocId, speakingBand, writingBand, task1Feedback, task2Feedback, teacherRecommendation } = req.body;
    const user = await User.findById(userDocId);
    if (!user) {
      return res.status(404).json({ error: "User document not found" });
    }

    if (!Array.isArray(user.mockInformation) || user.mockInformation.length === 0) {
      user.mockInformation = [{ mockID: "Mock-1" }];
    }

    if (speakingBand !== undefined && speakingBand !== "") {
      user.mockInformation[0].speakingBand = parseFloat(speakingBand);
      user.speakingScores = [parseFloat(speakingBand)];
    }

    if (writingBand !== undefined && writingBand !== "") {
      if (!user.mockInformation[0].writing) user.mockInformation[0].writing = {};
      user.mockInformation[0].writing.band = parseFloat(writingBand);
    }

    if (task1Feedback !== undefined) user.mockInformation[0].task1Feedback = task1Feedback;
    if (task2Feedback !== undefined) user.mockInformation[0].task2Feedback = task2Feedback;
    if (teacherRecommendation !== undefined) user.mockInformation[0].teacherRecommendation = teacherRecommendation;

    user.markModified("mockInformation");
    user.markModified("speakingScores");
    await user.save();

    // Calculate updated bands immediately so frontend can update DOM in real-time with zero page reload
    const mockInfo = user.mockInformation[0] || {};
    const lRaw = (mockInfo.listening && mockInfo.listening.score) || 0;
    const rRaw = (mockInfo.reading && mockInfo.reading.score) || 0;
    const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
    const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
    const wBand = (mockInfo.writing && mockInfo.writing.band) || 0;
    const sBand = mockInfo.speakingBand || (user.speakingScores && user.speakingScores[0]) || null;
    const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

    return res.json({
      success: true,
      message: "Scores updated successfully!",
      userDocId: user._id,
      speakingBand: sBand,
      writingBand: wBand,
      listeningBand: lBand,
      readingBand: rBand,
      overallBand,
      cefrLevel,
      task1Feedback: mockInfo.task1Feedback || "",
      task2Feedback: mockInfo.task2Feedback || "",
      teacherRecommendation: mockInfo.teacherRecommendation || ""
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 6.1. Real AI Writing Evaluation Endpoint (Google Gemini 3.5 Flash)
router.post("/ai_evaluate_writing", requireAdmin, async (req, res) => {
  try {
    const { userDocId } = req.body;
    const user = await User.findById(userDocId);
    if (!user) {
      return res.status(404).json({ error: "Candidate record not found." });
    }

    const mockInfo = (user.mockInformation && user.mockInformation[0]) || {};
    const wInputs = (mockInfo.writing && mockInfo.writing.writingInputs) || {};
    const task1Text = wInputs["part-1"] || "";
    const task2Text = wInputs["part-2"] || "";

    if (!task1Text && !task2Text) {
      return res.status(400).json({ error: "Candidate has not submitted any writing response for this test." });
    }

    // Call Gemini AI evaluation with realistic human marking guidelines
    const aiResult = await evaluateIeltsWriting({
      task1Text,
      task2Text,
      mockID: mockInfo.mockID || "Mock Exam"
    });

    // Save AI evaluation result into MongoDB
    if (!user.mockInformation) user.mockInformation = [{}];
    if (!user.mockInformation[0].writing) user.mockInformation[0].writing = {};

    user.mockInformation[0].writing.band = aiResult.finalWritingBand;
    user.mockInformation[0].task1Feedback = aiResult.task1.detailed_feedback;
    user.mockInformation[0].task2Feedback = aiResult.task2.detailed_feedback;
    user.mockInformation[0].teacherRecommendation = aiResult.teacherRecommendation;

    // Calculate updated bands immediately
    const lRaw = (mockInfo.listening && mockInfo.listening.score) || 0;
    const rRaw = (mockInfo.reading && mockInfo.reading.score) || 0;
    const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
    const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
    const wBand = aiResult.finalWritingBand;
    const sBand = mockInfo.speakingBand || (user.speakingScores && user.speakingScores[0]) || null;
    const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

    user.markModified("mockInformation");
    await user.save();

    return res.json({
      success: true,
      message: "AI Evaluation successfully completed & saved!",
      userDocId: user._id,
      candidateID: user.username,
      writingBand: wBand,
      speakingBand: sBand,
      listeningBand: lBand,
      readingBand: rBand,
      overallBand,
      cefrLevel,
      aiResult
    });
  } catch (err) {
    console.error("AI Evaluation Route Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// 7. Delete Single Passcode
router.post("/delete_passcode", requireAdmin, async (req, res) => {
  try {
    const { passcode, candidateID } = req.body;
    if (!passcode) {
      return res.status(400).json({ error: "Passcode is required." });
    }

    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";

    // 1. Delete from passCodes collection
    await passCodes.deleteOne({ pass: passcode, organization: org_name });

    // 2. Delete corresponding user row with that passcode
    if (candidateID) {
      await User.deleteOne({ username: candidateID, passcode: passcode, organization: org_name });
    } else {
      await User.deleteOne({ passcode: passcode, organization: org_name });
    }

    return res.json({ success: true, message: "Passcode deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 8. Delete Entire Candidate ID & All their records
router.post("/delete_candidate", requireAdmin, async (req, res) => {
  try {
    const { candidateID } = req.body;
    if (!candidateID) {
      return res.status(400).json({ error: "Candidate ID is required." });
    }

    const org_name = req.session.admin ? req.session.admin.admin_name : "ukatech";

    // Find all passcodes of this candidate to clean up passCodes collection too
    const userDocs = await User.find({ username: candidateID, organization: org_name }, "passcode");
    const passes = userDocs.map(u => u.passcode).filter(Boolean);

    if (passes.length > 0) {
      await passCodes.deleteMany({ pass: { $in: passes }, organization: org_name });
    }

    // Delete all user records under this candidate ID
    await User.deleteMany({ username: candidateID, organization: org_name });

    return res.json({ success: true, message: `Candidate ${candidateID} and associated passes deleted.` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 10. Public Test Report Form (TRF) View (Shareable on WhatsApp)
router.get("/trf_public/:userDocId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userDocId).lean();
    if (!user) {
      return res.status(404).send("<h3>Assessment Record Not Found.</h3>");
    }

    const mockInfo = (user.mockInformation && user.mockInformation[0]) || {};
    const lRaw = (mockInfo.listening && mockInfo.listening.score) || 0;
    const rRaw = (mockInfo.reading && mockInfo.reading.score) || 0;
    const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
    const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
    const wBand = (mockInfo.writing && mockInfo.writing.band) || 0;
    const sBand = mockInfo.speakingBand || (user.speakingScores && user.speakingScores[0]) || null;
    const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

    const name = (user.name || user.username || "Candidate").toUpperCase();
    const dateStr = user.time ? new Date(user.time).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB");
    const passcode = user.passcode || "UKA-MOCK";
    const mockID = mockInfo.mockID || "Academic Mock Exam";
    const feed1 = mockInfo.task1Feedback || "Writing Task 1 evaluation provided during examiner assessment.";
    const feed2 = mockInfo.task2Feedback || "Writing Task 2 evaluation provided during examiner assessment.";
    const rec = mockInfo.teacherRecommendation || "Consistent practice on task achievement, lexical resource, and grammatical accuracy is advised.";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official IELTS Mock TRF - ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    body { font-family:'Plus Jakarta Sans',sans-serif; background:#0f172a; margin:0; padding:20px; color:#1e293b; display:flex; flex-direction:column; align-items:center; }
    .top-toolbar { width:100%; max-width:800px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; color:#fff; }
    .btn-dl { background:#06b6d4; color:#fff; border:none; padding:12px 24px; font-size:15px; font-weight:800; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 15px rgba(6,182,212,0.4); }
    .btn-dl:hover { background:#0891b2; }
    .doc-page { width:100%; max-width:800px; background:#fff; padding:35px; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.3); margin-bottom:30px; box-sizing:border-box; }
    table { width:100%; border-collapse:collapse; }
  </style>
</head>
<body>
  <div class="top-toolbar">
    <div>
      <div style="font-weight:800; font-size:1.1rem; color:#38bdf8;">UKA Technical Assessment Portal</div>
      <div style="font-size:0.8rem; color:#94a3b8;">Official Verified Test Report Form (TRF)</div>
    </div>
    <button class="btn-dl" onclick="downloadPDF()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download Official PDF
    </button>
  </div>

  <div id="pdfContent">
    <!-- PAGE 1: TRF -->
    <div class="doc-page" id="page1">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:12px;">
        <img src="/2_UKA-&-British-council-Logo.png" style="height:55px;" onerror="this.src='/2_UKABritish-council-Logo.png'">
        <div style="border:2px solid #001f3f; padding:6px 14px; font-weight:800; font-size:15px; color:#001f3f;">ACADEMIC</div>
      </div>

      <div style="text-align:center; margin:18px 0 4px; font-size:22px; font-weight:900; color:#001f3f; letter-spacing:0.5px;">MOCK TEST REPORT FORM</div>
      <div style="text-align:center; font-size:11px; margin-bottom:18px; font-weight:700; color:#64748b;">UKA TECHNICAL INSTITUTE - ASSESSMENT DIVISION</div>

      <table style="border:1.5px solid #001f3f; margin-bottom:18px; font-size:13px;">
        <tr>
          <td colspan="2" style="border:1.5px solid #001f3f; padding:10px;">
            <span style="font-size:10px; font-weight:bold; color:#64748b; text-transform:uppercase;">Full Name of Candidate</span>
            <div style="font-size:16px; font-weight:bold; text-transform:uppercase; color:#001f3f;">${name}</div>
          </td>
          <td rowspan="3" style="border:1.5px solid #001f3f; width:120px; text-align:center; vertical-align:middle; padding:8px;">
            <div style="border:1px dashed #cbd5e1; height:120px; display:flex; align-items:center; justify-content:center; font-size:10px; color:#94a3b8; font-weight:600;">PHOTO AREA</div>
          </td>
        </tr>
        <tr>
          <td style="border:1.5px solid #001f3f; padding:10px;">
            <span style="font-size:10px; font-weight:bold; color:#64748b; text-transform:uppercase;">Date of Test (Mock)</span>
            <div style="font-size:14px; font-weight:bold;">${dateStr}</div>
          </td>
          <td style="border:1.5px solid #001f3f; padding:10px;">
            <span style="font-size:10px; font-weight:bold; color:#64748b; text-transform:uppercase;">Test Passcode / Token</span>
            <div style="font-size:14px; font-weight:bold; font-family:'JetBrains Mono',monospace; color:#001f3f;">${passcode}</div>
          </td>
        </tr>
        <tr>
          <td style="border:1.5px solid #001f3f; padding:10px;">
            <span style="font-size:10px; font-weight:bold; color:#64748b; text-transform:uppercase;">Country of Origin</span>
            <div style="font-size:14px; font-weight:bold;">BANGLADESH</div>
          </td>
          <td style="border:1.5px solid #001f3f; padding:10px;">
            <span style="font-size:10px; font-weight:bold; color:#64748b; text-transform:uppercase;">First Language</span>
            <div style="font-size:14px; font-weight:bold;">BENGALI</div>
          </td>
        </tr>
      </table>

      <table style="text-align:center; border:1.5px solid #001f3f; margin-bottom:18px;">
        <thead>
          <tr style="background:#f1f5f9; font-size:12px; font-weight:800; color:#001f3f;">
            <th style="border:1.5px solid #001f3f; padding:10px;">Listening</th>
            <th style="border:1.5px solid #001f3f; padding:10px;">Reading</th>
            <th style="border:1.5px solid #001f3f; padding:10px;">Writing</th>
            <th style="border:1.5px solid #001f3f; padding:10px;">Speaking</th>
            <th style="border:1.5px solid #001f3f; padding:10px; background:#001f3f; color:#fff;">Overall Band</th>
            <th style="border:1.5px solid #001f3f; padding:10px; background:#ecfeff; color:#0891b2;">CEFR Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:20px; font-weight:bold;">${lBand > 0 ? lBand.toFixed(1) : '-'} <span style="font-size:11px; font-weight:normal; display:block; color:#64748b;">(${lRaw}/40)</span></td>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:20px; font-weight:bold;">${rBand > 0 ? rBand.toFixed(1) : '-'} <span style="font-size:11px; font-weight:normal; display:block; color:#64748b;">(${rRaw}/40)</span></td>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:20px; font-weight:bold;">${wBand > 0 ? wBand.toFixed(1) : '-'}</td>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:20px; font-weight:bold;">${sBand !== null && sBand !== undefined ? sBand.toFixed(1) : '-'}</td>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:24px; font-weight:900; background:#f8fafc; color:#001f3f;">${overallBand ? overallBand.toFixed(1) : '-'}</td>
            <td style="border:1.5px solid #001f3f; padding:14px; font-size:20px; font-weight:bold; color:#0891b2;">${cefrLevel || '-'}</td>
          </tr>
        </tbody>
      </table>

      <div style="background:#fafafa; border:1px solid #e2e8f0; padding:12px; font-size:12px; line-height:1.5; color:#475569; margin-bottom:16px;">
        <strong>NOTICE:</strong> This official report is verified and issued by UKA Technical Assessment Division for IELTS mock assessment. Raw scores are converted based on official British Council / IDP IELTS grading standards.
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #e2e8f0; padding-top:12px; font-size:12px;">
        <span style="font-weight:bold; color:#001f3f;">UKA Technical Assessment Division</span>
        <span style="color:#64748b;">Official IELTS Mock TRF • Page 1 of 2</span>
      </div>
    </div>

    <!-- PAGE 2: FEEDBACK -->
    <div class="doc-page" id="page2">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:12px;">
        <img src="/2_UKA-&-British-council-Logo.png" style="height:45px;" onerror="this.src='/2_UKABritish-council-Logo.png'">
        <div style="font-weight:bold; color:#001f3f; font-size:16px;">FEEDBACK & DETAILED ANALYSIS</div>
      </div>

      <div style="margin-top:20px;">
        <h4 style="font-size:14px; font-weight:800; color:#001f3f; margin-bottom:6px;">Writing Task 1 Feedback:</h4>
        <div style="border-left:4px solid #06b6d4; padding:12px; background:#f8fafc; font-size:13px; line-height:1.6; border-radius:0 6px 6px 0; white-space:pre-wrap;">${escapeHtmlText(feed1)}</div>

        <h4 style="font-size:14px; font-weight:800; color:#001f3f; margin-top:18px; margin-bottom:6px;">Writing Task 2 Feedback:</h4>
        <div style="border-left:4px solid #06b6d4; padding:12px; background:#f8fafc; font-size:13px; line-height:1.6; border-radius:0 6px 6px 0; white-space:pre-wrap;">${escapeHtmlText(feed2)}</div>
      </div>

      <div style="margin-top:22px; padding:14px; background:#ecfeff; border-left:5px solid #06b6d4; border-radius:0 6px 6px 0;">
        <h4 style="margin:0 0 6px 0; font-size:14px; color:#001f3f;">Teacher's Recommendation:</h4>
        <p style="font-size:13px; line-height:1.5; margin:0; color:#334155;">${escapeHtmlText(rec)}</p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #e2e8f0; padding-top:12px; margin-top:22px; font-size:12px;">
        <span style="font-weight:bold; color:#001f3f;">UKA Assessment Division</span>
        <span style="color:#64748b;">Confidential Student Evaluation • Page 2 of 2</span>
      </div>
    </div>
  </div>

  <script>
    async function downloadPDF() {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const page1 = document.getElementById('page1');
      const page2 = document.getElementById('page2');

      const canvas1 = await html2canvas(page1, { scale: 2 });
      pdf.addImage(canvas1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);

      pdf.addPage();
      const canvas2 = await html2canvas(page2, { scale: 2 });
      pdf.addImage(canvas2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);

      pdf.save('UKA_TRF_${name}_${mockID}.pdf');
    }
  </script>
</body>
</html>`;

    return res.send(html);
  } catch (err) {
    return res.status(500).send("Server Error: " + err.message);
  }
});

// 11. Public Candidate Answer Script & Evaluation View (Shareable on WhatsApp)
router.get("/answers_public/:userDocId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userDocId).lean();
    if (!user) {
      return res.status(404).send("<h3>Assessment Record Not Found.</h3>");
    }

    const mockInfo = (user.mockInformation && user.mockInformation[0]) || {};
    const name = (user.name || user.username || "Candidate").toUpperCase();
    const candidateUsername = user.username || "Candidate";
    const dateStr = user.time ? new Date(user.time).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB");
    const passcode = user.passcode || "UKA-MOCK";
    const mockID = mockInfo.mockID || "Academic Mock Exam";

    const lRaw = (mockInfo.listening && mockInfo.listening.score) || 0;
    const rRaw = (mockInfo.reading && mockInfo.reading.score) || 0;
    const lBand = calculateBand(lRaw, "LIS", "ACADEMIC");
    const rBand = calculateBand(rRaw, "REA", "ACADEMIC");
    const wBand = (mockInfo.writing && mockInfo.writing.band) || 0;
    const sBand = mockInfo.speakingBand || (user.speakingScores && user.speakingScores[0]) || null;
    const { overallBand, cefrLevel } = calculateOverallBand(lBand, rBand, wBand, sBand);

    const lMistakes = (mockInfo.listening && mockInfo.listening.mistakes) || {};
    const rMistakes = (mockInfo.reading && mockInfo.reading.mistakes) || {};
    const wInputs = (mockInfo.writing && mockInfo.writing.writingInputs) || {};
    const feed1 = mockInfo.task1Feedback || "Pending examiner evaluation.";
    const feed2 = mockInfo.task2Feedback || "Pending examiner evaluation.";
    const rec = mockInfo.teacherRecommendation || "Consistent practice on task achievement, lexical resource, and grammatical accuracy is advised.";

    const lKeys = Object.keys(lMistakes);
    const rKeys = Object.keys(rMistakes);
    const w1Text = wInputs['part-1'] || '';
    const w2Text = wInputs['part-2'] || '';
    const w1Count = w1Text ? w1Text.trim().split(/\s+/).filter(Boolean).length : 0;
    const w2Count = w2Text ? w2Text.trim().split(/\s+/).filter(Boolean).length : 0;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IELTS Answer Script & Evaluation - ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      margin: 0;
      padding: 0 0 50px 0;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }
    .top-toolbar {
      width: 100%;
      background: #001f3f;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .toolbar-brand { display: flex; align-items: center; gap: 12px; color: #ffffff; }
    .toolbar-title { font-weight: 800; font-size: 1.05rem; letter-spacing: 0.3px; }
    .toolbar-subtitle { font-size: 0.8rem; color: #94a3b8; }
    .btn-dl {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 800;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(5,150,105,0.4);
      transition: all 0.2s ease;
    }
    .btn-dl:hover { background: #047857; transform: translateY(-1px); }
    .btn-dl:active { transform: translateY(0); }
    .btn-dl:disabled { opacity: 0.6; cursor: not-allowed; }

    /* A4 Document Container */
    .a4-doc-wrapper {
      width: 100%;
      max-width: 820px;
      padding: 0 15px;
    }
    #ansScriptDoc {
      width: 100%;
      background: #ffffff;
      padding: 38px 40px;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.35);
      box-sizing: border-box;
      color: #1e293b;
    }

    /* Print media rule */
    @media print {
      body { background: white; padding: 0; }
      .top-toolbar { display: none; }
      #ansScriptDoc { box-shadow: none; padding: 20mm; border-radius: 0; max-width: 100%; width: 210mm; }
    }
  </style>
</head>
<body>
  <div class="top-toolbar">
    <div class="toolbar-brand">
      <img src="/2_UKABritish-council-Logo.png" style="height: 38px;" onerror="this.src='/2_UKA-&-British-council-Logo.png'">
      <div>
        <div class="toolbar-title">UKA Technical Assessment Division</div>
        <div class="toolbar-subtitle">Official IELTS Candidate Answer Script & Evaluation • ${name}</div>
      </div>
    </div>
    <button class="btn-dl" onclick="downloadPDF()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download Answer Script (A4 PDF)
    </button>
  </div>

  <div class="a4-doc-wrapper">
    <div id="ansScriptDoc">
      <!-- Document Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2.5px solid #001f3f; padding-bottom:14px; margin-bottom:18px;">
        <img src="/2_UKABritish-council-Logo.png" style="height:52px;" onerror="this.src='/2_UKA-&-British-council-Logo.png'">
        <div style="text-align:right;">
          <div style="border:2px solid #001f3f; background:#f8fafc; color:#001f3f; font-weight:900; font-size:13px; padding:6px 14px; border-radius:4px; display:inline-block; letter-spacing:0.5px;">
            OFFICIAL EVALUATION SCRIPT
          </div>
          <div style="font-size:11px; color:#64748b; margin-top:4px; font-weight:700;">IELTS SIMULATION EXAM</div>
        </div>
      </div>

      <div style="text-align:center; margin-bottom:16px;">
        <h1 style="font-size:20px; font-weight:900; color:#001f3f; letter-spacing:0.8px; margin:0 0 4px 0;">CANDIDATE ANSWER SCRIPT & DIAGNOSTIC EVALUATION</h1>
        <div style="font-size:12px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:0.5px;">Full Module Analysis: Listening, Reading & AI Evaluated Writing</div>
      </div>

      <!-- Candidate Metadata Grid -->
      <div class="break-unit" style="margin-bottom:14px;">
        <table style="width:100%; border:1.5px solid #cbd5e1; border-collapse:collapse; font-size:12px;">
          <tr>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; width:20%; font-weight:700; color:#475569;">Candidate Name:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:800; color:#001f3f; text-transform:uppercase;">${name}</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; width:20%; font-weight:700; color:#475569;">Candidate ID:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:700; color:#001f3f;">${candidateUsername}</td>
          </tr>
          <tr>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; font-weight:700; color:#475569;">Mock Exam ID:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:800; color:#001f3f;">${mockID}</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; font-weight:700; color:#475569;">Passcode / Token:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#0284c7;">${passcode}</td>
          </tr>
          <tr>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; font-weight:700; color:#475569;">Exam Date:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:700;">${dateStr}</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; background:#f8fafc; font-weight:700; color:#475569;">Testing Center:</td>
            <td style="border:1px solid #cbd5e1; padding:7px 10px; font-weight:700; color:#047857;">UKA Technical Institute</td>
          </tr>
        </table>
      </div>

      <!-- 1. Listening Module Performance & Mistakes -->
      <div style="margin-top:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:5px; margin-bottom:8px;">
          <h3 style="color:#001f3f; font-size:13.5px; margin:0; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>🎧</span> Listening Module Performance & Diagnostic Mistakes
          </h3>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; font-weight:800; color:#001f3f; background:#f1f5f9; padding:2px 8px; border-radius:12px; border:1px solid #cbd5e1;">Score: ${lRaw}/40</span>
            <span style="font-size:11px; font-weight:700; color:${lKeys.length === 0 ? '#059669' : '#e11d48'}; background:${lKeys.length === 0 ? '#ecfdf5' : '#fff1f2'}; padding:2px 8px; border-radius:12px; border:1px solid ${lKeys.length === 0 ? '#a7f3d0' : '#fecdd3'};">
              ${lKeys.length === 0 ? '✓ Full Marks' : lKeys.length + ' Incorrect Answer(s)'}
            </span>
          </div>
        </div>
        ${lKeys.length === 0 ? `
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:10px; text-align:center; color:#065f46; font-size:12px; font-weight:700;">
            ✓ Perfect Score! All 40 Listening questions answered correctly.
          </div>
        ` : `
          <table style="width:100%; border-collapse:collapse; font-size:11.5px; border:1px solid #cbd5e1; margin-bottom:8px;">
            <thead>
              <tr style="background:#f1f5f9; color:#334155; text-align:left; border-bottom:1.5px solid #cbd5e1;">
                <th style="padding:6px 10px; width:55px; font-weight:800;">Q#</th>
                <th style="padding:6px 10px; font-weight:800;">Candidate Recorded Answer</th>
                <th style="padding:6px 10px; font-weight:800;">Official Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              ${lKeys.map((q, idx) => {
                const m = lMistakes[q];
                const rawAns = Array.isArray(m['Your answer']) ? m['Your answer'].join(', ') : (m['Your answer'] || '');
                const isBlank = !rawAns || rawAns.trim().toLowerCase() === 'blank';
                const cAns = Array.isArray(m['Correct answer']) ? m['Correct answer'].join(' / ') : (m['Correct answer'] || '');
                const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                return `
                  <tr style="background:${bg}; border-bottom:1px solid #e2e8f0;">
                    <td style="padding:5px 10px; font-weight:800; color:#001f3f;">Q.${escapeHtmlText(q)}</td>
                    <td style="padding:5px 10px;">
                      ${isBlank 
                        ? `<span style="color:#94a3b8; font-style:italic;">(No answer submitted)</span>` 
                        : `<span style="color:#dc2626; font-weight:600; text-decoration:line-through;">❌ ${escapeHtmlText(rawAns)}</span>`}
                    </td>
                    <td style="padding:5px 10px; color:#059669; font-weight:700;">✓ ${escapeHtmlText(cAns)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>

      <!-- 2. Reading Module Performance & Mistakes (Flows immediately after Listening) -->
      <div style="margin-top:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:5px; margin-bottom:8px;">
          <h3 style="color:#001f3f; font-size:13.5px; margin:0; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>📖</span> Reading Module Performance & Diagnostic Mistakes
          </h3>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; font-weight:800; color:#001f3f; background:#f1f5f9; padding:2px 8px; border-radius:12px; border:1px solid #cbd5e1;">Score: ${rRaw}/40</span>
            <span style="font-size:11px; font-weight:700; color:${rKeys.length === 0 ? '#059669' : '#d97706'}; background:${rKeys.length === 0 ? '#ecfdf5' : '#fffbeb'}; padding:2px 8px; border-radius:12px; border:1px solid ${rKeys.length === 0 ? '#a7f3d0' : '#fde68a'};">
              ${rKeys.length === 0 ? '✓ Full Marks' : rKeys.length + ' Incorrect Answer(s)'}
            </span>
          </div>
        </div>
        ${rKeys.length === 0 ? `
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:10px; text-align:center; color:#065f46; font-size:12px; font-weight:700;">
            ✓ Perfect Score! All 40 Reading questions answered correctly.
          </div>
        ` : `
          <table style="width:100%; border-collapse:collapse; font-size:11.5px; border:1px solid #cbd5e1; margin-bottom:8px;">
            <thead>
              <tr style="background:#f1f5f9; color:#334155; text-align:left; border-bottom:1.5px solid #cbd5e1;">
                <th style="padding:6px 10px; width:55px; font-weight:800;">Q#</th>
                <th style="padding:6px 10px; font-weight:800;">Candidate Recorded Answer</th>
                <th style="padding:6px 10px; font-weight:800;">Official Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              ${rKeys.map((q, idx) => {
                const m = rMistakes[q];
                const rawAns = Array.isArray(m['Your answer']) ? m['Your answer'].join(', ') : (m['Your answer'] || '');
                const isBlank = !rawAns || rawAns.trim().toLowerCase() === 'blank';
                const cAns = Array.isArray(m['Correct answer']) ? m['Correct answer'].join(' / ') : (m['Correct answer'] || '');
                const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                return `
                  <tr style="background:${bg}; border-bottom:1px solid #e2e8f0;">
                    <td style="padding:5px 10px; font-weight:800; color:#001f3f;">Q.${escapeHtmlText(q)}</td>
                    <td style="padding:5px 10px;">
                      ${isBlank 
                        ? `<span style="color:#94a3b8; font-style:italic;">(No answer submitted)</span>` 
                        : `<span style="color:#dc2626; font-weight:600; text-decoration:line-through;">❌ ${escapeHtmlText(rawAns)}</span>`}
                    </td>
                    <td style="padding:5px 10px; color:#059669; font-weight:700;">✓ ${escapeHtmlText(cAns)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>

      <!-- 3. Writing Task 1 Response & AI Evaluation (Flows immediately after Reading) -->
      <div class="break-unit" style="margin-top:16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:5px; margin-bottom:8px;">
          <h3 style="color:#001f3f; font-size:13.5px; margin:0; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>✍️</span> Writing Task 1: Candidate Response
          </h3>
          <span style="font-size:10.5px; font-weight:700; background:#f1f5f9; color:#475569; padding:2px 8px; border-radius:12px; border:1px solid #cbd5e1;">
            Word Count: ${w1Count} words (Req: 150+)
          </span>
        </div>
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; padding:10px 12px; font-size:11.5px; line-height:1.6; color:#1e293b; font-family:Georgia, serif; white-space:pre-wrap;">${escapeHtmlText(w1Text || 'No script submitted for Task 1.')}</div>
        
        <div style="background:#f0fdfa; border-left:3.5px solid #0d9488; border-radius:0 6px 6px 0; padding:10px 12px; margin-top:6px;">
          <div style="font-size:11px; font-weight:800; color:#0f766e; margin-bottom:3px; text-transform:uppercase; letter-spacing:0.3px;">Task 1 Examiner / AI Feedback & Assessment:</div>
          <div style="font-size:11.5px; line-height:1.5; color:#134e4a; white-space:pre-wrap;">${escapeHtmlText(feed1)}</div>
        </div>
      </div>

      <!-- 4. Writing Task 2 Response & AI Evaluation (Flows immediately after Task 1) -->
      <div class="break-unit" style="margin-top:16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #001f3f; padding-bottom:5px; margin-bottom:8px;">
          <h3 style="color:#001f3f; font-size:13.5px; margin:0; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>✍️</span> Writing Task 2: Candidate Response
          </h3>
          <span style="font-size:10.5px; font-weight:700; background:#f1f5f9; color:#475569; padding:2px 8px; border-radius:12px; border:1px solid #cbd5e1;">
            Word Count: ${w2Count} words (Req: 250+)
          </span>
        </div>
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; padding:10px 12px; font-size:11.5px; line-height:1.6; color:#1e293b; font-family:Georgia, serif; white-space:pre-wrap;">${escapeHtmlText(w2Text || 'No script submitted for Task 2.')}</div>
        
        <div style="background:#f0fdfa; border-left:3.5px solid #0d9488; border-radius:0 6px 6px 0; padding:10px 12px; margin-top:6px;">
          <div style="font-size:11px; font-weight:800; color:#0f766e; margin-bottom:3px; text-transform:uppercase; letter-spacing:0.3px;">Task 2 Examiner / AI Feedback & Assessment:</div>
          <div style="font-size:11.5px; line-height:1.5; color:#134e4a; white-space:pre-wrap;">${escapeHtmlText(feed2)}</div>
        </div>
      </div>

      <!-- 5. Strategic Recommendation -->
      <div class="break-unit" style="margin-top:14px; margin-bottom:14px; padding:10px 14px; background:#eff6ff; border-left:4px solid #2563eb; border-radius:0 6px 6px 0;">
        <h4 style="margin:0 0 4px 0; font-size:12px; color:#1e40af; font-weight:800;">Strategic Band Improvement Recommendation:</h4>
        <p style="font-size:11.5px; margin:0; line-height:1.5; color:#1e3a8a;">${escapeHtmlText(rec)}</p>
      </div>

      <!-- 6. Official Verification & Sign-off -->
      <div class="break-unit" style="margin-top:16px; padding-top:10px; border-top:1.5px solid #cbd5e1; display:flex; justify-content:space-between; align-items:center; font-size:10.5px; color:#64748b;">
        <div>
          <strong style="color:#001f3f;">UKA Technical Assessment Division</strong><br>
          Authorized IELTS Examination Simulation Center
        </div>
        <div style="text-align:right;">
          <span style="border:1.5px solid #047857; color:#047857; font-weight:800; padding:3px 8px; border-radius:4px; text-transform:uppercase; font-size:9.5px;">
            ✓ Official Certified Diagnostic Report
          </span>
        </div>
      </div>
    </div>
  </div>

  <script>
    async function downloadPDF() {
      const btn = document.querySelector('.btn-dl');
      const origText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Generating Multi-page A4 PDF...';

      try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const element = document.getElementById('ansScriptDoc');

        const scale = 2;
        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const a4WidthMm = 210;
        const a4HeightMm = 297;
        const marginSideMm = 12;
        const marginTopMm = 12;
        const marginBottomMm = 20;

        const contentWidthMm = a4WidthMm - (marginSideMm * 2); // 186mm
        const contentHeightMm = a4HeightMm - marginTopMm - marginBottomMm; // 265mm

        const pxPerMm = canvas.width / contentWidthMm;
        const maxPageCanvasHeight = Math.floor(contentHeightMm * pxPerMm);

        // Gather all natural cut points (between table rows, before headings, and card boundaries)
        const containerRect = element.getBoundingClientRect();
        const breakElements = element.querySelectorAll('tr, h3, h4, .break-unit');
        const cutPoints = [];
        breakElements.forEach(el => {
          const r = el.getBoundingClientRect();
          const top = Math.floor((r.top - containerRect.top) * scale);
          const bottom = Math.ceil((r.bottom - containerRect.top) * scale);
          if (top > 10) cutPoints.push(top);
          if (bottom > 10) cutPoints.push(bottom);
        });
        const uniqueCutPoints = Array.from(new Set(cutPoints)).sort((a, b) => a - b);

        const slices = [];
        let currentY = 0;
        const totalH = canvas.height;
        // Maximum allowed backtrack is 55 CSS px (~1-2 rows), NEVER giant leaps!
        const maxBacktrack = Math.floor(55 * scale);

        while (currentY < totalH) {
          const remainingH = totalH - currentY;
          if (remainingH <= maxPageCanvasHeight) {
            slices.push({ y: currentY, h: remainingH });
            break;
          }

          let targetEndY = currentY + maxPageCanvasHeight;
          let snapY = targetEndY;

          // Find the best clean break point near targetEndY within maxBacktrack
          for (let j = uniqueCutPoints.length - 1; j >= 0; j--) {
            const cp = uniqueCutPoints[j];
            if (cp <= targetEndY && cp >= (targetEndY - maxBacktrack)) {
              if (cp > currentY + (maxPageCanvasHeight * 0.5)) {
                snapY = cp;
                break;
              }
            }
          }

          const sliceH = snapY - currentY;
          slices.push({ y: currentY, h: sliceH });
          currentY = snapY;
        }

        const totalPages = slices.length || 1;

        for (let i = 0; i < totalPages; i++) {
          const s = slices[i];

          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = s.h;

          const sCtx = sliceCanvas.getContext('2d');
          sCtx.fillStyle = '#ffffff';
          sCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          sCtx.drawImage(
            canvas,
            0, s.y, canvas.width, s.h,
            0, 0, sliceCanvas.width, s.h
          );

          const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
          const sliceHeightMm = s.h / pxPerMm;

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(sliceImgData, 'JPEG', marginSideMm, marginTopMm, contentWidthMm, sliceHeightMm);

          // Clean footer
          pdf.setDrawColor(203, 213, 225);
          pdf.setLineWidth(0.4);
          pdf.line(marginSideMm, 285, a4WidthMm - marginSideMm, 285);

          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.setTextColor(100, 116, 139);
          pdf.text('UKA Technical Assessment Division • Candidate Answer Script & Evaluation', marginSideMm, 290);

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          pdf.text('Page ' + (i + 1) + ' of ' + totalPages, a4WidthMm - marginSideMm, 290, { align: 'right' });
        }

        pdf.save('UKA_AnswerScript_${name.replace(/\\s+/g, '_')}_${mockID}.pdf');
        btn.innerHTML = '✓ Download Complete!';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.disabled = false;
        }, 3000);
      } catch (e) {
        alert('PDF generation error: ' + e.message);
        btn.innerHTML = origText;
        btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;

    return res.send(html);
  } catch (err) {
    return res.status(500).send("Server Error: " + err.message);
  }
});

function escapeHtmlText(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

module.exports = router;
