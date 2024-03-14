const express = require('express');
const passport = require('../utils/auth');
const authController = require('../controller/auth');

const router = express.Router();

router
	.route('/register')
	.get(authController.getRegister)
	.post(authController.postRegister);

router.route('/verify/:id/:token').get(authController.verifyAccount);

router
	.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin);

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }),
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login',
	}),
);

router.get('/logout', authController.logout);

module.exports = router;
