//for user routes
const express= require('express');
const shopController = require('../controllers/index');
const router= express.Router();

router.get('/',shopController.getIndex);
module.exports = router;