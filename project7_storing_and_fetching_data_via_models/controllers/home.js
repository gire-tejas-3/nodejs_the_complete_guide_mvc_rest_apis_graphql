const data =  require('./product');
const Product = require('../models/product');

exports.getHome = (req, res, next) => {
    // const product = Product.fetchAll();
    /*
        res.render("product.ejs", {
            product,
            title: "Products",
            path: "/product",
        });
    */
    /* 
        Product.fetchAll() was returning product from simple Array, but we are now storing data in json file.
        so storing and reading data from file this procedure is happen Asynchronously (for no blocking of code mechanism)
        it will firstly return undefined, so product is returnig as undefined to views, which occurs the error on browser 

        so to minimise this error here pass callback function to retrive data from json file, if there is any error it 
        will return an empty [] instead of undefined, and if data present in file it will call cb() with data as argument
        and stored in product which will render to ejs page.
    */
    const product = Product.fetchAll(product => {
        res.render("index.ejs", {
            product,
            title: "Home Page",
            path: "/",
        });
    });
}; 