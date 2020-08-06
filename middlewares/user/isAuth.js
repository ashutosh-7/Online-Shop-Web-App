
module.exports = (req,res,next)=> {


    if(!req.session.isUserLoggedIn)
    {
        res.redirect('/login');
    }
    next();
};
