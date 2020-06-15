const express= require('express');
const path = require('path');
const rootDir = require('../util/path.js');
const authController = require('../controllers/auth');

const router= express.Router();


router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);


module.exports = router;