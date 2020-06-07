const Product = require('../models/product');

exports.getAddProducts = (req,res,next) => {
    
    res.render('admin/add-product',{
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
        res.render('admin/products',{
        product:product1,
        pageTitle:'Admin Products',
      
    });
});
}