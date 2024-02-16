const router = require('express').Router();
const homeController = require('../controller/index');
const authController = require('../controller/auth');
const protected = require('../controller/protectedRoutes');

router
	.route('/register')
	.get(authController.getRegister)
	.post(authController.postRegister);

router
	.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin);

router.route('/logout').get((req, res, next) => {
	res.clearCookie(process.env.COOKIE_KEY);
	res.redirect('/login');
});

router.use(protected.protected);

router
	.route('/admin')
	.get(homeController.getAdmin)
	.post(homeController.postAdmin);

router.route('/admin/:id').post(homeController.postUser);

router.route('/admin/:id/delete').post(homeController.deleteUser);

router.route('/').get(homeController.getHome);

module.exports = router;
