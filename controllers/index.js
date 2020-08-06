const Product = require('../models/Product');
const Order = require('../models/order');

exports.getIndex = (req,res,next) => {
   
    Product.find()
    .then(products => {
            
            res.render('index',{
            product:products,
            pageTitle:'Index',
        });
    })
    .catch(err => console.log(err));

}
