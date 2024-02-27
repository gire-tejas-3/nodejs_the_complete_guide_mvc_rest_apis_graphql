const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router
	.route('/register')
	.get(authController.getRegister)
	.post(authController.postRegister);

router
	.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router;