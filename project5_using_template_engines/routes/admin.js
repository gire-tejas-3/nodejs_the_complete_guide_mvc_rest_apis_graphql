const path = require("path");
const express = require("express");
const router = express.Router();

const reqData = [];

//  serving html
// router.get('/add', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'add.html'));
// });

// render .ejs file
router.get("/add", (req, res, next) => {
    res.render("add.ejs", { title: "Add Products Here", path: "/product/add" });
});

// router
//     .get('/', (req, res, next) => {
//         res.sendFile(path.join(__dirname, '../', 'views', 'product.html'));
//     })
//     .post('/', (req, res, next) => {
//         reqData.push({product: req.body.product});
//         res.redirect('/');
//     });

router
    .get("/", (req, res, next) => {
        res.render("product.handlebars", {
            data: reqData,
            title: "Products",
            path: "/product",
        });
    })
    .post("/", (req, res, next) => {
        reqData.push({
            product: req.body.product,
            title: "Products",
            path: "/product",
        });
        res.redirect("/product");
    });

// module.exports = router;
exports.router = router; // exported router module
exports.product = reqData; // exported reqData Array as module
