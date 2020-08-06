const Product = require('../../models/Product');

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

