const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router
	.route('/')
	.get(authController.getAccount)
	.post(authController.postAccount);

router
	.route('/password')
	.get(authController.getUpdatePassword)
	.post(authController.postUpdatePassword);

module.exports = router;
