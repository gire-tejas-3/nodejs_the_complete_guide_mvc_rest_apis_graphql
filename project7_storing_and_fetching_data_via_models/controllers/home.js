const data =  require('./product');
const Product = require('../models/product');

exports.getHome = (req, res, next) => {
    const product = Product.fetchAll();
    res.render("index.ejs", {
        product,
        title: "Home Page",
        path: "/",
    });
}; 