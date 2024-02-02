const products = [];

module.exports = class Product {
    constructor(product) {
        this.product = product;
    }

    save() {
        products.push(this);
    };

    static fetchAll() {
        return products;
    }
};
