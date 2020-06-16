//for admin routes
const express= require('express');
const path = require ('path');
const rootDir = require('../util/path.js');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router= express.Router();


router.get('/add-product',isAuth, adminController.getAddProducts);  //hm kitne v middleware jod skte hai...pehel request sbse pehle middleare mai jaayegi phir waha se next hoga tph aage jayegi...left to right aaata hai request middkeware se
router.post('/add-product',isAuth, adminController.postAddProducts);
router.get('/products',isAuth, adminController.getProducts);
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);
router.post('/edit-product',isAuth, adminController.postEditProduct);
router.post('/delete-product',isAuth, adminController.postDeleteProduct);


module.exports=router;
