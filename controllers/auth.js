exports.getLogin = (req,res,next)=> {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    // console.log(isLoggedIn);

    res.render('auth/login',{
    pageTitle:"Login",
    isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req,res,next)=> {
    // res.setHeader('Set-Cookie','loggedIn=true'); //ye cookie set karta hai browser mai
    req.session.isLoggedIn=true;
    res.redirect('/');
};