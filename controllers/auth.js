const User = require('../models/user');
const  connection  = require('mongoose');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next)=> {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    // console.log(isLoggedIn);

    res.render('auth/login',{
    pageTitle:"Login",
    isAuthenticated: req.session.isLoggedIn
    });
};
exports.getSignup = (req,res,next)=> {

    res.render('auth/signup',{
    pageTitle:"Login",
    isAuthenticated: false
    });
};
exports.postSignup =(req, res , next) => {
        const email=req.body.email;
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;

        User.findOne({email:email})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup'); //already exists user
            }
           
                return bcrypt.hash(password,12)
                .then(hashPassword => {
                    const user= new User ({
                    email:email,
                    password:hashPassword,
                    cart: {
                        items:[],
                        // quantity:0
                    }
    
                });
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
            }).catch(err => console.log(err));
              
           
        })
       
        .catch(err => console.log(err));

        
        
}


exports.postLogin = (req,res,next)=> {
    const email= req.body.email;
    const password= req.body.password;
    // console.log("I am here");
    User.findOne({email:email})
    .then(user => {
        if(!user)
        {
            return res.redirect('/login');
        }
        bcrypt.compare(password,user.password)
        .then(doMatch => {
            if(doMatch)
            {
                //logged in
                req.session.isLoggedIn = true;
                req.session.user = user;

                return req.session.save((err)=> {
                console.log(err);
                res.redirect('/');});
            }
            // console.log("I am here 2");
             return res.redirect('/login');
        })
        .catch(err => {
            res.redirect('/');
        })
        
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req,res,next)=> {
    req.session.destroy((err)=> {
        console.log(err)
        res.redirect('/');
    });
    
};