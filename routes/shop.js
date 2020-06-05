//for user routes
const express= require('express');
const path = require('path');
const rootDir = require('../util/path.js');
const productsController = require('../controllers/products');

const router= express.Router();


router.get('/',productsController.getProducts);

module.exports = router;