//for user routes
const express= require('express');
const path = require('path');
const rootDir = require('../util/path.js');
const shopController = require('../controllers/shop');

const router= express.Router();

router.get('/',shopController.getIndex);
router.get('/cart',shopController.getCart);
router.get('/checkout',shopController.getCheckout);
router.get('/products',shopController.getProducts);




module.exports = router;