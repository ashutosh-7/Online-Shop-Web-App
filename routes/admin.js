//for admin routes
const express= require('express');
const path = require ('path');
const rootDir = require('../util/path.js');
const adminController = require('../controllers/admin');

const router= express.Router();


router.get('/add-product',adminController.getAddProducts);
router.post('/add-product',adminController.postAddProducts);
router.get('/products',adminController.getProducts);

exports.routes = router;
