const Product = require('../models/product');
const Cart = require('../models/cart');



exports.getProducts = (req,res,next) => {
    Product.findAll()
    .then(products => {
        console.log(products);
            res.render('shop/product-list',{
            product:products,
            pageTitle:'Shop',
        });
    
    })
    .catch(err => x.log(err));
    
}

exports.getProduct = (req,res,next ) => {
    const id1 = req.params.productId;
    Product.findByPk(id1)
    .then((product) => {
        // console.log(product);
            res.render('shop/product-detail',{
                
            product:product,
            pageTitle:'Product details'
            });
    })
    .catch(err => console.log(err));
}


exports.getIndex = (req,res,next) => {
    Product.findAll()
    .then(products => {
            
            res.render('shop/index',{
            product:products,
            pageTitle:'Index'
        });
    })
    .catch(err => x.log(err));

}

exports.getCart = (req,res,next) => {
            Cart.getCart(cart => {
            
                Product.fetchAll(products => {

                    const cartProducts = [];

                    for(product of products)
                    {
                        const cartProductData = cart.products.find( prod => prod.id === product.id);
                        if(cartProductData)
                        {
                            cartProducts.push({
                                productData : product,
                                qty: cartProductData.qty,
                            });
                        }
                        
                    }

                    res.render('shop/cart',{
                        products : cartProducts,
                        pageTitle:'Your Cart'
                    });


                });
            
            });
}

exports.postCart = (req,res,next) => {
    const id = req.body.productId;
    Product.findById(id ,product => {
        Cart.addProduct(id,product.price);
    })
    res.redirect('/cart');
};

exports.postCartDeleteItem = (req,res,next ) => {
    const id = req.body.productId;
    Product.findById(id, product => {
        Cart.deleteProduct(id,product.price);
        res.redirect('/cart');
    })

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
