const path = require("path");
const express = require("express");
const reqData = require("./product");
// imported controllers
const homeController =  require('../controllers/home');

const router = express.Router();

// Middleware fuction moved to controller folder to write buisiness logic as a controllers
router.get("/", homeController.getHome);

module.exports = router;
