const Product = require('../models/product');

exports.getAddProducts = (req,res,next) => {
    
    res.render('add-product',{
        pageTitle:'Add Product',
    });
}

exports.postAddProducts = (req,res,next) => {
    const product = new Product(req.body.item);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    Product.fetchAll( product1 => {
            res.render('shop',{
            product:product1,
            pageTitle:'Shop',
            path: '/',
            hasProducts: product1.length>0,
            activeShop: true,
            productCSS:true
        });
    });
   
}