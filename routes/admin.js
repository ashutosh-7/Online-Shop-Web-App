//for admin routes
const express= require('express');
const path = require ('path');
const rootDir = require('../util/path.js');
const productsController = require('../controllers/products');

const router= express.Router();


router.get('/add-product',productsController.getAddProducts);
router.post('/add-product',productsController.postAddProducts);

exports.routes = router;
