const User = require("../FrontPage/Backend/models/User");

exports.loginUser = async (req, res) =>{
    const { username, email, phone } = req.body;
    let user = await User.findOne({username, email, phone});

    if(!user){
        
        
        res.redirect("/");
    }
     else{
        
        req.session.user = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        plan: user.plan,
        mockInformation: user.mockInformation 
        }
        
        res.redirect("/select-mock");
    }
    
};

    


