const User = require('../model/user');

const protectedRoutes = function (req, res, next) {
	const cookieKey = process.env.COOKIE_KEY;
	const value = req.cookies[`${cookieKey}`];

	if (!value) {
		res.clearCookie(cookieKey);
		return res.redirect('/login');
	}

	User.findOne({ username: value })
		.then((result) => {
			if (!result) {
				res.clearCookie(cookieKey);
				res.redirect('/login');
				return;
			} else {
				req.user = result;
				if (!req.locals) {
					req.locals = {};
				}

				req.locals.user = result;

				return next();
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = {
	protectedRoutes,
};
