const bcrypt = require('bcrypt');
const passport = require('passport');
const crypto = require('crypto');

const User = require('../../model/user');
const Token = require('../../model/token');
const Designation = require('../../model/designation');
const Departments = require('../../model/departments');
const { verifyCsrfToken } = require('../../utils/csrf');
const AppError = require('../../utils/error');
const sendMail = require('../../utils/mailgun');

exports.getRegister = (req, res, next) => {
	res.render('register', { title: 'Register' });
};

exports.postRegister = (req, res, next) => {
	const { userName, email, password, role, _csrf } = req.body;

	if (!(userName.length > 3 && userName.length < 16)) {
		req.toastr.error(
			'Username should be greater than 3 Characters, and not exceed more than 16 Character',
		);
		return res.redirect('/register');
	}

	if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
		req.toastr.error('Invalid Email Address');
		return res.redirect('/register');
	}

	if (
		!password.match(
			/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/,
		)
	) {
		req.toastr.error(
			'Password Should Contain At least one digit, At least one lowercase letter, at least one uppercase letter, at least one special character, not less than 8 characters and not exceed 16 characters',
		);
		return res.redirect('/register');
	}

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	User.findOne({ username: userName, email: email })
		.then((result) => {
			if (!result) {
				const user = new User({
					username: userName,
					email: email,
					password: password,
					role: role,
				});

				user.save()
					.then((result) => {
						const token = new Token({
							userId: result._id,
							token: crypto.randomBytes(18).toString('hex'),
						});

						token
							.save()
							.then((_token) => {
								const subject = `Registered to TejTech`;
								const html = `<h3>Welcome to TejTech Pvt Ltd</h3></br>
									<p>You have successfully register with TejTech Pvt Ltd</p></br>
									<p>Please verify your account with following link:</p>
									<a href="${req.protocol}://${req.get('host')}/verify/${result._id}/${
									_token.token
								}">Verify Your Account!</a>
								`;

								req.toastr.success(
									'Registered Successfully!,Please Verify Your Account with email',
								);
								res.redirect('/login');
								return sendMail(email, subject, html);
							})
							.catch((error) => {
								next(new AppError(error, 500));
							});
					})
					.catch((error) => {
						next(new AppError(error, 500));
					});
			} else {
				req.toastr.error('Already Have Account, Please Sign in!');
				return res.redirect('/login');
			}
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.verifyAccount = (req, res, next) => {
	const id = req.params.id;
	const token = req.params.token;

	Promise.all([
		User.findById(id),
		Token.findOne({ userId: id, token: token }),
	])
		.then(([user, token]) => {
			if (!user) {
				req.toastr.error('Invalid User ID');
				return res.redirect('/login');
			}

			if (user.isVerified) {
				req.toastr.info(
					'Your Account is already verified. You can now login.',
				);

				return res.redirect('/login');
			}

			if (!token) {
				req.toastr.error('Invalid Link');
				return res.redirect('/login');
			}

			user.isVerified = true;

			return Promise.all([user.save(), token.deleteOne()]);
		})
		.then(() => {
			req.toastr.success('Account Verified Successfully! Login Now!!!');
			res.redirect('/login');
		})
		.catch((error) => {
			console.log(error);
			req.toastr.error('Error verifying account. Please try again.');
			res.redirect('/login');
		});
};

exports.getLogin = (req, res, next) => {
	res.render('login', { title: 'Sign In' });
};

exports.postLogin = (req, res, next) => {
	const { username, password, _csrf } = req.body;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	User.findOne({ $or: [{ username: username }, { email: username }] })
		.then((result) => {
			if (!result) {
				req.toastr.error(
					'User not found, Please register before login!!!',
				);
				return res.redirect('/login');
			}

			if (!result.isVerified) {
				req.toastr.error(
					'Your Account Not verified, Please Check Your Email',
				);
				return res.redirect('/login');
			}

			bcrypt
				.compare(password, result.password)
				.then((isMatched) => {
					if (!isMatched) {
						req.toastr.error('Please Enter Correct Password!');
						return res.redirect('/login');
					}

					req.toastr.success('Logged In!');

					passport.authenticate('local', {
						successRedirect: '/',
						failureRedirect: '/login',
					})(req, res, next);
				})
				.catch((error) => {
					next(new AppError(error, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.logout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(new AppError(err, 500));
		}
		return res.redirect('/login');
	});
};

exports.getAccount = (req, res, next) => {
	const user = req.user || req.locals.user;

	Promise.all([
		User.findById({ _id: user._id }),
		Designation.find(),
		Departments.find(),
	])
		.then(([accounts, designations, departments]) => {
			res.render('update', {
				title: 'Update Profile',
				user,
				accounts,
				designations,
				departments,
			});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.postAccount = (req, res, next) => {
	const user = req.user || req.locals.user;

	const {
		firstname,
		middlename,
		lastname,
		contact,
		gender,
		dateOfBirth,
		_csrf,
	} = req.body;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	const data = {
		firstname: firstname,
		middlename: middlename,
		lastname: lastname,
		contact: contact,
		gender: gender,
		dateOfBirth: dateOfBirth,
	};

	if (req.files && req.files.profileImage) {
		const profileImage = req.files.profileImage[0];
		data.profileImage = {
			filename: profileImage.filename,
			mimetype: profileImage.mimetype,
		};
	}

	if (req.files && req.files.resume) {
		const resume = req.files.resume[0];
		data.resume = {
			filename: resume.filename,
			mimetype: resume.mimetype,
		};
	}

	if (user.role === 'admin') {
		data.department = req.body.department;
		data.designation = req.body.designation;
	}

	User.findByIdAndUpdate({ _id: user._id }, data)
		.then((result) => {
			req.toastr.success('Your Account Updated!');
			return res.redirect('/');
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.getUpdatePassword = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('update_password', { title: 'Update Passwords', user });
};

exports.postUpdatePassword = (req, res, next) => {
	const { oldPassword, newPassword, confirmPassword, _csrf } = req.body;
	const user = req.user || req.locals.user;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	User.findById(user._id)
		.then((result) => {
			if (
				!newPassword.match(
					/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/,
				)
			) {
				req.toastr.error(
					`Password Should Contain At least one digit, At least one lowercase letter, 
					at least one uppercase letter, at least one special character, not less than 
					8 characters and not exceed 16 characters`,
				);
				return res.redirect('/account/password');
			}

			if (confirmPassword !== newPassword) {
				req.toastr.error(
					'New Password should Match with Confirm Password',
				);
				return res.redirect('/account/password');
			}

			if (result.password) {
				bcrypt
					.compare(oldPassword, result.password)
					.then((isOldMatched) => {
						if (!isOldMatched) {
							req.toastr.error(
								'Invalid Password, Please Enter Correct Old Password',
							);
							return res.redirect('/account/password');
						}

						if (oldPassword === newPassword) {
							req.toastr.error(
								'New Password Should be different from old password',
							);
							return res.redirect('/account/password');
						}

						result.password = newPassword;
						result
							.save()
							.then((results) => {
								req.session.regenerate((err) => {
									if (err) req.toastr.error(err);
									req.session.user = results;
									req.toastr.success('Password Updated!!');
									return res.redirect('/');
								});
							})
							.catch((error) => {
								next(new AppError(error, 500));
							});
					})
					.catch((error) => {
						next(new AppError(error, 500));
					});
			} else {
				result.password = newPassword;
				result
					.save()
					.then((results) => {
						req.session.regenerate((err) => {
							if (err) req.toastr.error(err);
							req.session.user = results;
							req.toastr.success('Password Updated!!');
							return res.redirect('/');
						});
					})
					.catch((error) => {
						next(new AppError(error, 500));
					});
			}
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};
