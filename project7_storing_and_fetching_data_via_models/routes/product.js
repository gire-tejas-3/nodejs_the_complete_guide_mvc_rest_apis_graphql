const path = require("path");
const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/add", productController.getAddProducts);
router
    .get("/", productController.getProduct)
    .post("/", productController.postProduct);

exports.router = router;
