// without model we were storing data in simple array
// const reqData = [];

// using models we will store data in objects or in files like JSON which can make sence. to storing our data
// here imported Product Model 
const Product =  require('../models/product');

exports.postProduct = (req, res, next) => { 
    // reqData.push({
    //     product: req.body.product,
    //     title: "Products",
    //     path: "/product",
    // });
    
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
        // product: reqData,
        product,
        title: "Products",
        path: "/product",
    });
};

// exports.reqData = reqData;