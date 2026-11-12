module.exports = function(req, res, next){
    const inputPassword = req.query.pass;

    if(!inputPassword || inputPassword !== "pokemongo40"){
        return res.status(401).send("Unauthorized: Incorrect or Missing password");
    }
    next();
};