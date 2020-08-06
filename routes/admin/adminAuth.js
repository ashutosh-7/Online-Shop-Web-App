const express= require('express');
const router= express.Router();
const authController = require('../../controllers/admin/adminAuth');
const isAuth= require('../../middlewares/admin/isAuth');
const isCheck= require('../../middlewares/admin/isCheck');

router.get('/admin/login',isCheck,authController.getLogin);
router.post('/admin/login',isCheck,authController.postLogin);
router.post('/admin/logout',isAuth,authController.postLogout);




module.exports = router;