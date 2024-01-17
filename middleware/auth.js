const isLoggedIn = async (req, res, next)=>{
    if(req.isAuthenticated()) return next ()
    return res.json ({error: "Login Session Expired"})
};

module.exports = {isLoggedIn}