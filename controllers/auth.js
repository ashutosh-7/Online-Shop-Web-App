const User = require('../models/user');

exports.getLogin = (req,res,next)=> {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    // console.log(isLoggedIn);

    res.render('auth/login',{
    pageTitle:"Login",
    isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req,res,next)=> {
    User.findById('5ee7be260f77b1b934b27ca1')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err)=> {
          console.log(err);
          res.redirect('/');
      });
      
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req,res,next)=> {
    req.session.destroy((err)=> {
        console.log(err)
        res.redirect('/');
    });
    
};