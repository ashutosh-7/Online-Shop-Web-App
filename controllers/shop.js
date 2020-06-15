const Product = require('../models/product');

// const Cart = require('../models/cart');
// const Order = require('../models/order');



exports.getProducts = (req,res,next) => {
    Product.fetchAll()
    .then(products => {
        console.log(products);
            res.render('shop/product-list',{
            product:products,
            pageTitle:'Shop',
        });
    
    })
    .catch(err => console.log(err));
    
}

exports.getProduct = (req,res,next ) => {
    const id1 = req.params.productId;
    // console.log(id1);
    Product.findById(id1)
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
    Product.fetchAll()
    .then(products => {
            
            res.render('shop/index',{
            product:products,
            pageTitle:'Index'
        });
    })
    .catch(err => x.log(err));

}

exports.getCart = (req,res,next) => {

        req.user.getCart()
        .then(cart=> {
            return cart.getProducts()
            .then(products=> {

                    res.render('shop/cart',{
                    products : products,
                    pageTitle:'Your Cart'
                });

            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
          


}

exports.postCart = (req,res,next) => {
    const id = req.body.productId;
    let fetchCart;
   req.user
   .getCart()
   .then(cart => {
       fetchCart=cart;
       return cart.getProducts({where:{id: id}});
   })
   .then(products=> {
       let product;
       if(products.length>0)
       {
        product=products[0];
       }
       let newQuantity=1;
       if(product)
       {
           //increase qty
           const oldQuantity= product.cartItem.quantity;
           newQuantity=oldQuantity + 1;
           return fetchCart.addProduct(product, {through:{quantity:newQuantity}});
       }
       return Product.findByPk(id)
       .then(product=> {
        return fetchCart.addProduct(product, {through:{quantity:newQuantity}});
       })
       .catch(err =>console.log(err));
   })
   .then(result=> {
    res.redirect('/cart');
   })
   .catch(err => console.log(err));
    // res.redirect('/cart');
};

exports.postCartDeleteItem = (req,res,next ) => {
    const id = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where : {id: id}});
    })
    .then(products => {
        const product= products[0];
        return product.cartItem.destroy();
    })
    .then(result=> {
        res.redirect('/cart');
    })
    .catch(err=> console.log(err));

};


exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
    pageTitle:'Your Orders'
});
}

exports.postOrder=(req,res,next)=> {

    req.user
    .getCart()
    .then(cart=> {
        return cart.getProducts();
    })
    .then(products=> {
        return req.user.createOrder()
        .then(order => {
           return  order.addProducts(products.map(product=> {
                product.orderItem={quantity:product.cartItem.quantity};
                return product;
            }));
        })
        .catch(err=> console.log(err));

    })
    .then(result => {
        res.render('/order');
    })
    .catch(err => console.log(err));


};



exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
    pageTitle:'Checkout'
    });
}
