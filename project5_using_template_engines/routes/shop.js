const path = require("path");
const express = require("express");

const reqData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
    const data = reqData.product;
    res.render("index.pug", { product: data, title: "Shop Page", path: "/" });
});

module.exports = router;
