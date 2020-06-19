const crypto=require('crypto');
const  connection  = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const {validationResult}= require('express-validator/check');

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          'sendGridApiKey
    })
  );
exports.getLogin = (req,res,next)=> {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    // console.log(isLoggedIn);
    let message=req.flash('error');
    if(message.length> 0)
    {
        message=message[0];
        
    }
    else
    {
        message=null;
    }
    res.render('auth/login',{
    pageTitle:"Login",
    errorMessage:message
    });
};
exports.getSignup = (req,res,next)=> {

    let message=req.flash('error');
    if(message.length>0)
    {
        message=message[0];
        
    }
    else
    {
        message=null;
    }
    res.render('auth/signup',{
    pageTitle:"Login",
    errorMessage:message
    });
};
exports.postSignup =(req, res , next) => {
        const email=req.body.email;
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;
        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
             return res.status(422).render('auth/signup',{
                pageTitle:"Signup",
                errorMessage:errors.array()[0].msg
                });
        }

             bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
              const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
              });
              return user.save();
            })
            .then(result => {
              res.redirect('/login');
            //   console.log("Sending Mails");
            //   return transporter.sendMail({
                  
            //     to: email,
            //     from: 'helloashutoshoo7@gmail.com',
            //     subject: 'Signup succeeded!',
            //     html: '<h1>You successfully signed up!</h1>'
            //   });
            })
            .catch(err => {
              console.log(err);
        
        })
        .catch(err => {
          console.log(err);
        });
        
        
}


exports.postLogin = (req,res,next)=> {
    const email= req.body.email;
    const password= req.body.password;
    // console.log("I am here");
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }


    User.findOne({email:email})
    .then(user => {
        if(!user)
        {
            req.flash('error','Invalid Email or Password' );
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

exports.getReset=(req,res,next)=> {
    let message=req.flash('error');
    if(message.length>0)
    {
        message=message[0];
        
    }
    else
    {
        message=null;
    }
        res.render('auth/reset',{
        pageTitle:"Reset Password",
        errorMessage:message
        });
};

exports.postReset=(req,res,next )=> {
    crypto.randomBytes(32,(err,buffer)=> {
        if(err)
        {
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
    });
}
