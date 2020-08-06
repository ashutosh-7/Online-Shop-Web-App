const Product = require('../../models/Product');
const User = require('../../models/User');

exports.getHome =(req,res,next)=> {
    Product.find()
    .then(products => {
            res.render('user/home',{
            product:products,
            pageTitle:'Home',
            name:req.session.user.name
            
        });
    })
    .catch(err => console.log(err));
    
}; 
exports.getProduct = (req,res,next ) => {
    const id1 = req.params.productId;
    Product.findById(id1)
    .then((product) => {
            res.render('shop/product-detail',{
            product:product,
            pageTitle:'Product details',
            });
    })
    .catch(err => console.log(err));
}

exports.getCart = (req,res,next) => {
 
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user=> {
        const products = user.cart.items;
            return res.render('shop/cart',{
            products : products,
            pageTitle:'Your Cart',
            });
        })
    .catch(err => console.log(err));
}

exports.postCart = (req,res,next) => {
    
const id = req.body.productId;
Product.findById(id)
.then(product => {
    console.log(req.user);
    return req.user.addToCart(product);
})
.then(result => {
    console.log(result);
    res.redirect('/cart');
})
.catch(err => console.log(err));
};

exports.postCartDeleteItem = (req,res,next ) => {
const id = req.body.productId;
// console.log(id);
req.user
.removeFromCart(id)
.then(result=> {
    // console.log("deleted");
    res.redirect('/cart');
})
.catch(err=> console.log(err));

};


// exports.getOrders = (req,res,next) => {
// Order.find({"user.userId":req.user._id})
// .then(orders=> {
//     res.render('shop/orders',{
//         pageTitle:'Your Orders',
//         orders:orders,
//         isAuthenticated: req.session.isLoggedIn
// });
// })
// .catch(err=> console.log(err));


// }

// exports.postOrder=(req,res,next)=> {
// req.user
// .populate('cart.items.productId')
// .execPopulate()
// .then(user=> {
//     const products= user.cart.items.map(i => {
//         return {quantity: i.quantity, product:{ ...i.productId._doc}} ;
//     });
//     const order = new Order({
//    user: {
//        email:req.user.email,
//        userId:req.user,
//    },
//    products: products
// });
// return  order.save();

// })
// .then(result => {
//    console.log(result);
//    return req.user.clearCart();
// })
// .then(result => {
//    res.redirect('/orders');
// })
// .catch(err => console.log(err));


// };



// exports.getCheckout = (req,res,next) => {
// res.render('shop/checkout',{
// pageTitle:'Checkout'
// });
// }
