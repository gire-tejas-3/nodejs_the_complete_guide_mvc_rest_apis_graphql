const router = require('express').Router();
const authController = require('../controller/auth');

router.route('/register')
    .get(authController.getRegister)
    .post(authController.postRegister);

router.route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin);

module.exports = router;