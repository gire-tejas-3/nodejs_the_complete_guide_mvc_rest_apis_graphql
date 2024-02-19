const User = require('../model/user');
exports.protected = (req, res, next) => {
	const key = process.env.COOKIE_KEY;
	const val = req.cookies[`${key}`];

	User.findOne({ username: val })
		.then((result) => {
			if (!result || !val) {
				res.clearCookie(key);
				res.redirect('/login');
				return;
			} else {
				req.user = result;
				if (!req.locals) {
					req.locals = {};
				}
				req.locals.user = result;
				next();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
