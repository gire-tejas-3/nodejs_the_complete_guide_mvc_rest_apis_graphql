const User = require('../model/user');

const protectedRoutes = function (req, res, next) {
	if (!req.user || !req.user._id) {
		res.redirect('/login');
		return;
	}

	User.findById(req.user._id)
		.then((result) => {
			if (!result) {
				req.logout((err) => {
					if (err) console.log(err);
					res.redirect('/login');
				});
			} else {
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

const adminProtectedRoutes = function (req, res, next) {
	if (req.user.role !== 'admin') {
		return res.redirect('/');
	}

	next();
};

const updateAccount = function (req, res, next) {
	User.findById(req.user._id).then((result) => {
		const fieldsToCheck = [
			'firstname',
			'middlename',
			'lastname',
			'contact',
			'dateOfBirth',
			'department',
			'designation',
		];

		const emptyFields = fieldsToCheck.filter((field) => !result[field]);

		if (emptyFields.length > 0 && req.url !== '/account') {
			req.toastr.info('Please Update Your Account');
			return res.redirect('/account');
		}

		next();
	});
};

module.exports = {
	protectedRoutes,
	adminProtectedRoutes,
	updateAccount,
};
