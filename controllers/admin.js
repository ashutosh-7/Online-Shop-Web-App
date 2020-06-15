
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
    const product= new Product(title,price,description,imageUrl,null,req.user._id);
    product.save()
    .then(result => {
        res.redirect('/admin/add-product');
    })
    .catch(err => console.log(err));
   
    };

exports.getEditProduct = (req,res,next) => {
    
    const editMode = req.query.edit;
    // console.log(editMode);
    if(editMode==false)
    {
        return res.redirect('/');
    }
    const id = req.params.productId;
    Product.findById(id)
    .then(product => {
        const product1= product;
        if(!product)
        {
            return res.redirect('/');
        }
            res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            editing : editMode,
            product:product1
    
        });
    })
    .catch(err => console.log(err));
    
        
}

exports.postEditProduct = (req,res,next) => {
    
    const id= req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product= new Product(title,price,description,imageUrl,id);
    product.save()
    .then(result => {
        console.log("Updated product");
        res.redirect('/');
    })
    .catch(err => console.log(err));
    
}


exports.getProducts = (req,res,next) => {
        Product.fetchAll()
        .then(products => {
                res.render('admin/products',{
                product:products,
                pageTitle:'Admin Products',
              
            });
        })
        .catch(err => console.log(err));
}

exports.postDeleteProduct= (req,res,next) => {

    const id= req.body.productId;
   Product.deleteById(id)
    .then( ()=> {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
}