const Product = require('../../models/Product');

exports.getHome = (req,res,next) => {
    
    res.render('./admin/home',{
        pageTitle:"Admin Panel",
    });
        
};


exports.getAddProducts = (req,res,next) => {
    
        res.render('admin/edit-product',{
        pageTitle:'Add Product',
        isAuthenticated: req.session.isLoggedIn,
        editing:false
    });
}

exports.postAddProducts = (req,res,next) => {
   
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const isAuthenticated= req.session.isLoggedIn
    const product= new Product({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        
    });

    product.save()
    .then(result => {
      
        res.redirect('/admin/add-product');
    })
    .catch(err => console.log(err));
   
    };

    exports.getEditProduct = (req,res,next) => {
    
        const editMode = req.query.edit;
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
                isAuthenticated: req.session.isLoggedIn,
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
        Product.findById(id)
        .then(product=> {
            product.title=title;
            product.price=price;
            product.description=description;
            product.imageUrl=imageUrl;
            return product.save();
        })
        .then(result => {
            console.log("Updated product");
            res.redirect('/');
        })
        .catch(err => console.log(err));
        
    }
    
    
    exports.getProducts = (req,res,next) => {
            Product.find()
            // .select('title price -id')
            // .populate('userId ', 'name') //es user id se jo related data hai wo sb aa jayenge
            .then(products => {
                    res.render('admin/products',{
                    product:products,
                    pageTitle:'Admin Products',
                    isAuthenticated: req.session.isLoggedIn
                  
                });
            })
            .catch(err => console.log(err));
    }
    
    exports.postDeleteProduct= (req,res,next) => {
    
        const id= req.body.productId;
        Product.findByIdAndRemove(id)
        .then( ()=> {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
        
    }