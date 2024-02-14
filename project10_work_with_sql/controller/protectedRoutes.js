const Register = require('../model/register');
exports.protected = (req, res, next) => {
	const key = process.env.COOKIE_KEY;
	const val = req.cookies[`${key}`];

	Register.fetchAll(exsistingUser => {
		const exsistUserData =  exsistingUser.find((user) => user.username === val);
		if (!val) {
			res.clearCookie(key);
			res.redirect('/login');
			return;
		} else {
			req.user = exsistUserData;
			if (!req.locals) {
				req.locals = {};
			}
			req.locals.user = exsistUserData;
			next();
		}
	})

};