const Product = require('../models/product');

exports.getAddProducts = (req,res,next) => {
    
    res.render('admin/add-product',{
        pageTitle:'Add Product',
    });
}

exports.postAddProducts = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title,imageUrl,description,price);
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