// const products = [];
const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path.js');
const Cart = require('./cart');

    const getFileProducts = (call_Back)=> {
        const p = path.join(rootDir,'data','products.json');
        fs.readFile(p,(err,fileContent)=> {
            if(err)
            call_Back([]);
            else
            call_Back(JSON.parse(fileContent));
        });
    } 

    module.exports = class Product{

    constructor(id,title,imageUrl,description,price)
    {
        this.id=id;
        this.title= title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }

    save(){
        


        const p = path.join(rootDir,'data','products.json');
        getFileProducts((products) => {

            if(this.id)
            {
                const existingProductIndex = products.findIndex( prod=> prod.id===this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex]=this;

                fs.writeFile(p , JSON.stringify(updatedProduct) , (err) =>
                {
                    console.log(err);
                });
            }
            else
            {
                this.id =String (Math.random());
               
                products.push(this);
                fs.writeFile(p , JSON.stringify(products) , (err) =>
                {
                    console.log(err);
                });
            }


            
        })
          
    }
    static deleteById(id)
    {
        const p = path.join(rootDir,'data','products.json');
        getFileProducts(products => {
            const product =  products.find(prod => prod.id === id);
            const updatedProducts = products.filter(p => p.id!==id)
            
                fs.writeFile(p , JSON.stringify(updatedProducts) , (err) =>
                {
                    if(!err)
                    {
                        Cart.deleteProduct(id,product.price);
                        //remove this from every cart also because it is not avialable right now
                    }
                });
        });
    }
    static fetchAll(call_Back){
        getFileProducts(call_Back);
    }

    static findById(id, cb)
        {
            getFileProducts(products => {
                const product = products.find(p => p.id===id)
                cb(product);
            });
        }
}

