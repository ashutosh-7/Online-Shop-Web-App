//for user routes
const express= require('express');
const path = require('path');
const rootDir = require('../util/path.js');
const shopController = require('../controllers/shop');

const router= express.Router();

router.get('/',shopController.getIndex);
// router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
// router.post('/delete-cart-item',shopController.postCartDeleteItem);
// router.get('/orders',shopController.getOrders);
// router.get('/checkout',shopController.getCheckout);
router.get('/products',shopController.getProducts);
// router.get('/create-order',shopController.postOrder);

router.get('/products/:productId',shopController.getProduct); //dynamic routtes uses controller



module.exports = router;