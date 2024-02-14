const User = require('../model/user');
exports.protected = (req, res, next) => {
	const key = process.env.COOKIE_KEY;
	const val = req.cookies[`${key}`];

	User.findOne({where: {username: val || ''}})
		.then((result) => {
			if(!val) {
				res.clearCookie(key);
				res.redirect('/login');
				return;
			} else {
				req.user = result.dataValues;
				if (!req.locals) {
					req.locals = {};
				}
				req.locals.user = result.dataValues;
				next();
			}
		})
		.catch((err) => {
			console.log(err);
		});

	// User.fetchAll()
	// 	.then(([data]) => {
	// 		if (!val) {
	// 			res.clearCookie(key);
	// 			res.redirect('/login');
	// 			return;
	// 		} else {
	// 			req.user = data[0];
	// 			if (!req.locals) {
	// 				req.locals = {};
	// 			}
	// 			req.locals.user = data[0];
	// 			next();
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};
