const bcrypt = require('bcryptjs');
const Admin = require('../../models/Admin');



exports.getLogin =(req,res,next)=> {
        
        if(req.session.isAdminLoggedIn)
        {
            res.render('admin/home',{
                pageTitle:'Home',
            });
        }
        res.render('admin/login',{
        pageTitle:'Login',
    });

}; 




exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.session.isLoggedIn);
     Admin.findOne({ username: username })
      .then(user => {
        if (!user) {
          req.flash('error_msg','You are not a admin.');
          return res.redirect('/admin/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isAdminLoggedIn = true;
              req.session.user = user;
              
              return req.session.save(err => {
                console.log(err);
                console.log(req.session.user);
                res.redirect('/admin/home');
              });
            }
            req.flash('error_msg','Wrong Password.');
            res.redirect('/admin/login');
          })
          .catch(err => {
            console.log(err);
            req.flash('error_msg','Something wrong happened , please retry again.');
            res.redirect('/admin/login');
          });
      })
      .catch(err => console.log(err));

  };
 

  exports.postLogout = (req, res, next) => {
    console.log("11Logout");
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };

  