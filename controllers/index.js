const Product = require('../models/Product');
const Order = require('../models/order');

exports.getIndex = (req,res,next) => {
    // if(req.session.isLoggedIn)
    // {
    //     res.redirect('/user/home');
    // }
    Product.find()
    .then(products => {
            
            res.render('index',{
            product:products,
            pageTitle:'Index',
        });
    })
    .catch(err => x.log(err));

}
