const path = require("path");
const express = require("express");
const router = express.Router();
// imported controllers
const productController = require("../controllers/product");

// added particular controller for respective route
router.get("/add", productController.getAddProducts);
router
    .get("/", productController.getProduct)
    .post("/", productController.postProduct);

exports.router = router;
