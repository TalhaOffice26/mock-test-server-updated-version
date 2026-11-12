const express = require('express');
const router = express.Router();
const path = require('path');
const User = require("../FrontPage/Backend/models/User");
const TestQuestions = require("../models/testQuestion");
const SpeakingBookings = require("../models/speaking_slots");
const passCodes = require("../models/passcodes");
const AddAdmin = require("../models/admin_orgs");
const {loginUser} = require('../controllers/authController');
const adminAuth = require("../middleware/adminAuthMiddleware");

function removeAt(arr, index) {
  var j = 0;
  var arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    if (i != index) {
      arr2[j] = arr[i];
      j++;
    }
  }
  return arr2
}

function generateRandomStrings(number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
  const strings = [];

  for (let i = 0; i < number; i++) {
    let str = '';
    for (let j = 0; j < 12; j++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    strings.push(str);
  }

  return strings;
}


router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/admin.html'));
    
})

router.get("/users", adminAuth, async (req, res)=>{
    const users = await User.find();
    res.json(users);
});

router.delete('/delete', adminAuth, async(req, res)=>{
    const {email} = req.query;
    if(!email) return res.status(400).send('Missing email');

    await User.deleteOne({email});
    res.send(`User with email ${email} deleted.`);
});

//add_user
router.post('/add-user', adminAuth, async(req, res)=>{
    const {username, email, phone, plan} = req.body;
    if(!username || !email || !phone || !plan) {
        return res.status(400).send("Missing fields");
    }
    const user = await User.findOne({email: email});
    if(user){
        res.status(500).send("Error adding user. User already exists with the same email.");
    }else{
    try {
        const newUser = new User({username, email, phone, plan});
        await newUser.save();
        res.status(200).send("User added"); 
    } catch (err){
        res.status(500).send('Error adding user: ' + err.message);
    }
}
});


//add_admin
router.post('/add-admin', adminAuth, async(req, res)=>{
    const {adminName, setPass, setPassLimit} = req.body;

    if(!adminName || !setPass || !setPassLimit){
        return res.status(400).send("Missing Fields");
    }

    const newAdmin = await AddAdmin.findOne({admin_name: adminName});
    if(newAdmin){
        res.status(500).send("Error adding admin. Admin already exists with the same name");
    } else{
        try{
            const newAdmin = new AddAdmin({admin_name: adminName, admin_password: setPass, admin_limit: setPassLimit});
            await newAdmin.save();
            res.status(200).send("Admin added");
        }catch(err){
            res.status(500).send('Error adding user: ' + err.message);
        }
    }
})



//generate passcodes 
router.post('/generate-passcodes', adminAuth, async(req, res)=>{
    const {organization, passcode} = req.body;
    if(!organization || !passcode) {
        return res.status(400).send("Missing fields");
    }
         try{
                
            const newPass = new passCodes({organization: organization, pass: passcode})
            await newPass.save();
            res.end();
            }catch(err){
            res.status(500).send("Error generating passcodes: " + err.message);
            }

})

router.get("/show-passcodes",  async(req, res)=>{
    const organization = req.query.organization;

    try{
        const passcodes = await passCodes.find({organization: organization})
        res.json(passcodes);
    }catch(err){
        res.status(500).send("Error: " + err.message);
    }
})


router.get('/update-profile', async(req, res)=>{


    res.sendFile(path.join(__dirname, '../public/admin_update.html'));
})


router.post('/update-band-score', async(req, res)=>{
    if(req.session.user){
        const user = await User.findOne({email: req.session.user.email});

        const {id, listeningBand, readingBand, writingBand, speakingBand, overallBand} = req.body;
        console.log(id);
        console.log(listeningBand);
        console.log(readingBand);
        console.log(writingBand);
        user.mockInformation.forEach((mock, index)=>{
            if(id == mock.mockID){
                mock.listening.band = listeningBand;
                mock.reading.band = readingBand;
                mock.writingBand = writingBand;
                mock.speakingBand = speakingBand;
                mock.overallBand = overallBand;
                mock.bandUpdated = true;
                console.log(mock);

            }
        })
        user.markModified("mockInformation");
        await user.save();
    }
})

//update speaking data and add score to users according to id

router.post("/speaking-booking", async(req, res)=>{
    const {username,email, plan, testId, score, examiners_note, completed} = req.body;
    const speakingId = `Speaking-${testId}`;
    const user = await SpeakingBookings.findOne({email: email});

    try{
        user.speaking_dates.forEach((date)=>{
            if(date.testId == testId){
                date.completed = completed;
                date.score = score;
                date.examiners_note = examiners_note;
            }
        })

        user.markModified("speaking_dates");
        await user.save();
        res.end();
    }catch(err){
        console.log(err);
    }

})


module.exports = router;
