//for user routes
const express= require('express');
const path = require('path');

const rootDir = require('../util/path.js');

const router= express.Router();


router.get('/',(req,res,next) => {
    console.log("Main page");
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;