const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../FrontPage/Backend/models/User");
const TestQuestions = require("../models/testQuestion");
const adminAuth = require("../middleware/adminAuthMiddleware");

const listeningPractice = require("../models/listeningPractice");
const readingPractice = require("../models/readingPractice");
const writingPractice = require("../models/writingPractice");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});

/*
router.get("/api/plan-limit", (req, res)=>{
    if(req.session.user){
      res.json({plan: req.session.user.plan})
    } else{
      res.status(401).send("Unauthorized");
    }
})*/
router.get("/select-mock", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});

router.get("/passcode-for-mock/mock", async (req, res) => {
  const mockID = req.query;

  let mock = await TestQuestions.findOne({ mockNumber: mockID.mockID });
  if (!mock) {
    res.status(401).send("error getting mock");
  }

  req.session.mock = {
    mockNumber: mock.mockNumber,
    plan: mock.plan,
    listening: mock.listening,
    reading: mock.reading,
    writing: mock.writing,
  };
  res.sendFile(path.join(__dirname, "../public/passcode.html"));
});

router.get("/select-mock/mock", async (req, res) => {
  const mockID = req.query;

  let mock = await TestQuestions.findOne({ mockNumber: mockID.mockID });

  if (!mock) {
    res.status(401).send("error getting mock");
  }

  req.session.mock = {
    mockNumber: mock.mockNumber,
    plan: mock.plan,
    listening: mock.listening,
    reading: mock.reading,
    writing: mock.writing,
  };

  console.log(mock.listening);
  console.log("redirectinggggggg");
  try {
    res.redirect("/mock-test");
    console.log("bruh");
  } catch (err) {
    console.log(err);
  }
});

/*
router.get("/api/mockTest", (req, res)=>{
    if(req.session.mock){
        res.json({questions: req.session.mock.questions, instructions: req.session.mock.instructions});
    } else{
        res.status("401").send("error");
    }
})*/

router.get("/mock-test", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mock.html"));
});

const mock_test = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mock.html"));
};

router.get("/authority_login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin_for_orgs_login.html"));
});

const authority_login = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin_for_orgs_login.html"));
};

router.get("/passcodes", async (req, res) => {
  const mockID = req.query.mockID;

  let mock = await TestQuestions.findOne({ mockNumber: mockID });

  if (!mock) {
    res.status(401).send("error getting mock");
  } else {
    req.session.mock = {
      mockNumber: mock.mockNumber,
      plan: mock.plan,
      listening: mock.listening,
      reading: mock.reading,
      writing: mock.writing,
    };

    res.sendFile(path.join(__dirname, "../public/passcode.html"));
  }
});

const passcodes = async (req, res) => {
  const mockID = req.query.mockID;

  let mock = await TestQuestions.findOne({ mockNumber: mockID });

  if (!mock) {
    res.status(401).send("error getting mock");
  } else {
    req.session.mock = {
      mockNumber: mock.mockNumber,
      plan: mock.plan,
      listening: mock.listening,
      reading: mock.reading,
      writing: mock.writing,
    };

    res.sendFile(path.join(__dirname, "../public/passcode.html"));
  }
};

router.get("/view_results", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/view_results.html"));
});
const view_results = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/view_results.html"));
};
/*
router.get("/admin", (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/admin.html'));
})

router.get("/admin/users", adminAuth, async (req, res)=>{
    const users = await User.find();
    res.json(users);
});

router.delete('/admin/delete', adminAuth, async(req, res)=>{
    const {email} = req.query;
    if(!email) return res.status(400).send('Missing email');

    await User.deleteOne({email});
    res.send(`User with email ${email} deleted.`);
});

router.post('/admin/add-user', adminAuth, async(req, res)=>{
    const {username, email, phone, plan} = req.body;
    if(!username || !email || !phone || !plan) {
        return res.status(400).send("Missing fields");
    }

    try {
        const newUser = new User({username, email, phone, plan});
        await newUser.save();
        res.status(200).send("User added"); 
    } catch (err){
        res.status(500).send('Error adding user: ' + err.message);
    }
});

*/

router.get("/listening-test", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/listening/listening.html"),
  );
});
const listening_test = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/listening/listening.html"),
  );
};
router.get("/reading-test", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/reading/reading.html"),
  );
});
const reading_test = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/reading/reading.html"),
  );
};

router.get("/writing-test", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/writing/writing.html"),
  );
});
const writing_test = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/test_pages/writing/writing.html"),
  );
};

router.get("/test-completed", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/test_completed.html"));
});

const test_completed = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/test_completed.html"));
};

router.get("/listening-practice", async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await listeningPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    res.status(401).send("error getting prac. contact SIAM");
  }
  req.session.pracListening = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    listening: practiceData.listening,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(__dirname, "../views/practice_pages/listening/listening.html"),
  );
});

const listening_practice = async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await listeningPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    return res.redirect("/practice-hub");
  }
  req.session.pracListening = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    listening: practiceData.listening,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(
      __dirname,
      "../views/practice_pages/listening/listening-prac.html",
    ),
  );
};

router.get("/reading-practice", async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await readingPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    res.status(401).send("error getting prac.contact SIAM");
  }
  req.session.pracReading = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    reading: practiceData.reading,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(__dirname, "../views/practice_pages/reading/reading-prac.html"),
  );
});

const reading_practice = async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await readingPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    return res.redirect("/practice-hub");
  }
  req.session.pracReading = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    reading: practiceData.reading,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(__dirname, "../views/practice_pages/reading/reading-prac.html"),
  );
};

router.get("/writing-practice", async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await writingPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    res.status(401).send("error getting prac. contact SIAM");
  }
  req.session.pracWriting = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    writing: practiceData.writing,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(__dirname, "../views/practice_pages/writing/writing.html"),
  );
});

const writing_practice = async (req, res) => {
  const pracNumber = req.query.pracNumber;
  const type = req.query.type;

  let practiceData = await writingPractice.findOne({
    pracNumber: pracNumber,
    type: type,
  });
  if (!practiceData) {
    return res.redirect("/practice-hub");
  }
  req.session.pracWriting = {
    pracNumber: practiceData.pracNumber,
    plan: practiceData.plan,
    writing: practiceData.writing,
    type: practiceData.type,
  };
  res.sendFile(
    path.join(__dirname, "../views/practice_pages/writing/writing-prac.html"),
  );
};

router.get("/practice-hub", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontPage/Frontend/Practice-hub.html"));
});

const practice_hub = (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontPage/Frontend/Practice-hub.html"));
};

module.exports = {
  router,
  authority_login,
  view_results,
  passcodes,
  mock_test,
  listening_test,
  reading_test,
  writing_test,
  practice_hub,
  listening_practice,
  reading_practice,
  writing_practice,
  test_completed,
};
