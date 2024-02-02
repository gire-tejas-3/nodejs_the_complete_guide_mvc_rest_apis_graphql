const path = require("path");
const express = require("express");
const reqData = require("./product");
const homeController =  require('../controllers/home');

const router = express.Router();

router.get("/", homeController.getHome);

module.exports = router;
