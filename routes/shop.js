//for user routes
const express= require('express');
const path = require('path');
const adminData = require('./admin');
const rootDir = require('../util/path.js');

const router= express.Router();


router.get('/',(req,res,next) => {
    // console.log("Main page");
   const products = adminData.products;
    res.render('shop',{
        product:products,
        pageTitle:'Shop',
        path: '/',
        hasProducts: products.length>0,
        activeShop: true,
        productCSS:true
    });
});

module.exports = router;