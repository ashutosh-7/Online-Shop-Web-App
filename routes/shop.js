//for user routes
const express= require('express');
const path = require('path');
const rootDir = require('../util/path.js');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router= express.Router();

router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/cart',isAuth,shopController.getCart);
router.post('/cart',isAuth,shopController.postCart);
router.post('/delete-cart-item',isAuth,shopController.postCartDeleteItem);
router.get('/orders',isAuth,shopController.getOrders);
// router.get('/checkout',shopController.getCheckout);
router.post('/create-order',isAuth,shopController.postOrder);
router.get('/products/:productId',shopController.getProduct); //dynamic routtes uses controller



module.exports = router;