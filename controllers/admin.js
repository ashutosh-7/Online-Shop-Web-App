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
    Product.create({
        title:title,  //model_attribute: variable stored values
        price:price,
        description:description,
        imageUrl:imageUrl
    })
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
    Product.findByPk(id)
    .then(product => {
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
    .catch(err => console.log(err));
    
        
}

exports.postEditProduct = (req,res,next) => {
    
    const id= req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    Product.findByPk(id)
    .then(product => {
        product.title=title;
        product.price=price;
        product.imageUrl=imageUrl;
        product.description=description;
       

        return product.save();
    })
    .then(result => {
        console.log("Updated product");
        res.redirect('/');
    })
    .catch(err => console.log(err));
    
}


exports.getProducts = (req,res,next) => {
        Product.findAll()
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
    Product.findByPk(id)
    .then(product =>{
        return product.destroy();
    })
    .then(result=> {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
}