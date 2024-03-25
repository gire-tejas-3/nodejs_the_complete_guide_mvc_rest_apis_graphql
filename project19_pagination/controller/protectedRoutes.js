const User = require('../model/user');
const AppError = require('../utils/error');

const protectedRoutes = function (req, res, next) {
	if (!req.user || !req.user._id) {
		return res.redirect('/login');
	}

	User.findById(req.user._id)
		.then((result) => {
			if (!result) {
				req.logout((err) => {
					if (err) console.log(err);
					return res.redirect('/login');
				});
			}

			if (!result.isActive) {
				req.logout((err) => {
					req.toastr.error(
						'Your account is inactive, Please contact with Admin',
					);
					return res.redirect('/login');
				});
			}

			if (!req.isAuthenticated) {
				req.toastr.error('AUthentication Failed, Please try again!');
				return res.redirect('/login');
			}

			if (!req.locals) {
				req.locals = {};
			}
			req.locals.user = result;
			next();
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

const adminProtectedRoutes = function (req, res, next) {
	if (req.user.role !== 'admin') {
		return res.redirect('/');
	}

	next();
};

const updateAccount = function (req, res, next) {
	User.findById(req.user._id)
		.then((result) => {
			const fieldsToCheck = [
				'firstname',
				'middlename',
				'lastname',
				'contact',
				'email',
				'username',
				'gender',
				'role',
				'dateOfBirth',
				// 'department',
				// 'designation',
			];

			const emptyFields = fieldsToCheck.filter((field) => !result[field]);
			// console.log(emptyFields)

			if (emptyFields.length > 0 && req.url !== '/account') {
				req.toastr.info('Please Update Your Account');
				return res.redirect('/account');
			}

			next();
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

module.exports = {
	protectedRoutes,
	adminProtectedRoutes,
	updateAccount,
};
