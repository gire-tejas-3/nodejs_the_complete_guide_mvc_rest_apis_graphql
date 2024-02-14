const User = require('../model/user');
exports.protected = (req, res, next) => {
	const key = process.env.COOKIE_KEY;
	const val = req.cookies[`${key}`];

	User.fetchAll()
		.then(([data]) => {
			if (!val) {
				res.clearCookie(key);
				res.redirect('/login');
				return;
			} else {
				console.log(data[0])
				req.user = data[0];
				if (!req.locals) {
					req.locals = {};
				}
				req.locals.user = data[0];
				next();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};