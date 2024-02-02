const Product = require("../models/product");

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.product);
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
    // const product = Product.fetchAll();
    /*
        res.render("product.ejs", {
            product,
            title: "Products",
            path: "/product",
        });
    */

    /* 
        Above Product.fetchAll() was returning product from simple Array, but we are now storing data in json file.
        so storing and reading data from file this procedure is happen Asynchronously (for no blocking of code mechanism)
        it will firstly return undefined, so product is returnig as undefined to views, which occurs the error on browser 

        so to minimise this error here pass callback function to retrive data from json file, if there is any error it 
        will return an empty [] instead of undefined, and if data present in file it will call cb() with data as argument
        and stored in product which will render to ejs page.
    */
    Product.fetchAll((product) => {
        res.render("product.ejs", {
            product,
            title: "Products",
            path: "/product",
        });
    });
};
