const Product = require('../models/product');
const Cart = require('../models/cart');



exports.getProducts = (req,res,next) => {
    Product.fetchAll( product1 => {
            res.render('shop/product-list',{
            product:product1,
            pageTitle:'Shop',
            path: '/',
            hasProducts: product1.length>0,
            activeShop: true,
            productCSS:true
        });
    });
   
}

exports.getProduct = (req,res,next ) => {
    const id = req.params.productId;
    console.log(id);
    Product.findById(id, product1 => {
            res.render('shop/product-detail',{
            product:product1,
            pageTitle:'Product details'
            
    });
});
}


exports.getIndex = (req,res,next) => {
    Product.fetchAll( product1 => {
            res.render('shop/index',{
            product:product1,
            pageTitle:'Index'
        });
    });
   
}

exports.getCart = (req,res,next) => {
            res.render('shop/cart',{
            pageTitle:'Your Cart'
        });
}

exports.postCart = (req,res,next) => {
    const id = req.body.productId;
    Product.findById(id ,product => {
        Cart.addProduct(id,product.price);
    })
    res.redirect('/cart');
};


exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
    pageTitle:'Your Orders'
});
}




exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
    pageTitle:'Checkout'
    });
}
