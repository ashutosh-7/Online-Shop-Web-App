//for admin routes
const express= require('express');
const path = require ('path');

const rootDir = require('../util/path.js');
const router= express.Router();

const products = [];

router.get('/add-product',(req,res,next) => {
    
    res.render('add-product',{
        pageTitle:'Add Product',
    });
});
router.post('/add-product',(req,res,next) => {
    products.push({title: req.body.item});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;