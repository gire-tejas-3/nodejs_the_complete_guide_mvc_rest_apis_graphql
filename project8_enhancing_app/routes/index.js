const router = require('express').Router();
const homeController = require('../controller/index');
const authRouter =  require('./auth');

// home
router.get('/', homeController.getHome);

// authentication,
router.use(authRouter);

module.exports = router;