const User = require('../model/user');

const protectedRoutes = function (req, res, next) {
	if (!req.session.user || !req.session.user._id) {
		res.redirect('/login');
		return;
	}

	User.findById(req.session.user._id)
		.then((result) => {
			if (!result) {
				res.session.destroy((err) => {
					if (err) console.log(err);
					res.redirect('/login');
				});
			} else {
				req.user = result;
				if (!req.locals) {
					req.locals = {};
				}

				req.locals.user = result;
				next();
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = {
	protectedRoutes,
};
