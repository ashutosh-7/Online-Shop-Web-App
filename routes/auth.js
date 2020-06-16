const express= require('express');
const { check , body} = require('express-validator/check');
const path = require('path');
const rootDir = require('../util/path.js');
const authController = require('../controllers/auth');
const User= require('../models/user');
const router= express.Router();


router.get('/signup',authController.getSignup);
router.post('/signup',
[
check('email')
.isEmail()
.withMessage("Please Enter Valid Email")
.custom((value,{req}) => {
    return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'E-Mail exists already, please pick a different one.'
          );
        }
      });
    }),


body('password').isLength({min : 1}).withMessage("Please Enter Valid Pssword")
.isAlphanumeric(),

    body('confirmPassword')
    .custom( (value,{req} )=> {
        if(value!==req.body.password)
        {
            throw new Error("Password not matched");
        }
    })
]

,authController.postSignup);
router.get('/login',authController.getLogin);
router.post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
      body('password', 'Password has to be valid.')
        .isLength({ min: 1 })
        .isAlphanumeric()
    ],
    authController.postLogin
  );
router.post('/logout',authController.postLogout);
router.get('/reset',authController.getReset);


module.exports = router;