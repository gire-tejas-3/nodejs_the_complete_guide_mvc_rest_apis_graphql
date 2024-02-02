const Product =  require('../models/product');

exports.postProduct = (req, res, next) => { 
    const product =  new Product(req.body.product);
    product.save();
    res.redirect("/product");
};

exports.getAddProducts = (req, res, next) => {
    res.render("add.ejs", {
        title: "Add Products Here",
        path: "/product/add",
    });
};

exports.getProduct = (req, res, next) => {
    const product = Product.fetchAll();
    res.render("product.ejs", {
        product,
        title: "Products",
        path: "/product",
    });
};