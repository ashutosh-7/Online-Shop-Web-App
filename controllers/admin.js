const Product = require('../models/product');

exports.getAddProducts = (req,res,next) => {
    
    res.render('admin/edit-product',{
        pageTitle:'Add Product',
        editing:false
    });
}

exports.postAddProducts = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product(null,title,imageUrl,description,price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req,res,next) => {
    
    const editMode = req.query.edit;
    // console.log(editMode);
    if(editMode==false)
    {
        return res.redirect('/');
    }
    const id = req.params.productId;
    Product.findById(id, product => {
        if(!product)
        {
            return res.redirect('/');
        }
            res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            editing : editMode,
            product:product
    
        });
    })
        
}

exports.postEditProduct = (req,res,next) => {
    
    const id= req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const updatedProduct = new Product(id,title,imageUrl,description,price);
    updatedProduct.save();
    res.redirect('/admin/products');
    
}


exports.getProducts = (req,res,next) => {
    Product.fetchAll( product1 => {
        res.render('admin/products',{
        product:product1,
        pageTitle:'Admin Products',
      
    });
});
}

exports.postDeleteProduct= (req,res,next) => {

    const id= req.body.productId;
    Product.deleteById(id);
    
    // console.log('gooti');
    res.redirect('/');
}