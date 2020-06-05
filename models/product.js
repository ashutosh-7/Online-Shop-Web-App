const products = [];

module.exports = class Product{

    constructor(title_name)
    {
        this.title= title_name;
    }

    save(){
        products.push(this);
    }
    static fetchAll(){
        return products;
    }
}

