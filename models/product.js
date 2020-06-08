// const products = [];
const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path.js');

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

    constructor(title,imageUrl,description,price)
    {
        this.title= title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }

    save(){
        const p = path.join(rootDir,'data','products.json');
        getFileProducts((products) => {
            products.push(this);
            fs.writeFile(p , JSON.stringify(products) , (err) =>
            {
                console.log(err);
            });
        })
          
    }
    static fetchAll(call_Back){
        getFileProducts(call_Back);
    }
}

