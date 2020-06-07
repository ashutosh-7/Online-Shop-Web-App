// const products = [];
const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path.js');

module.exports = class Product{

    constructor(title_name)
    {
        this.title= title_name;
    }

    save(){
        // products.push(this);
       
        const p = path.join(rootDir,'data','products.json');
       
        fs.readFile(p, (err,fileContent)=>{
            let products = [];
            if(!err)
            {
                products = JSON.parse(fileContent);
            }
            products.push(this);

            fs.writeFile(p , JSON.stringify(products) , (err) =>
            {
                console.log(err);
            });

            });
            
    }
    static fetchAll(call_Back){
        const p = path.join(rootDir,'data','products.json');

            fs.readFile(p,(err,fileContent)=> {
                if(err)
                call_Back([]);
                call_Back(JSON.parse(fileContent));
            });
            // return products;
    }
}

