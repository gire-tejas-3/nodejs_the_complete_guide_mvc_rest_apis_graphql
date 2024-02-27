const User = require('../../model/user');

exports.getRegister = (req, res, next) => {
	res.render('register', { title: 'Register' });
};

exports.postRegister = (req, res, next) => {
	const { userName, email, password, role } = req.body;

	if (!(userName.length > 3 && userName.length < 16)) {
		console.log(
			'Username should be greater than 3 Characters, and not exceed more than 16 Character',
		);
		return res.redirect('/register');
	}

	if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
		console.log('Invalid Email Address');
		return res.redirect('/register');
	}

	if (
		!password.match(/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/)
	) {
		console.log(
			'Password Should Contain At least one digit, At least one lowercase letter, at least one uppercase letter, at least one special character, not less than 8 characters and not exceed 16 characters',
		);
		return res.redirect('/register');
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
					.then(() => {
						console.log('Registered Successfully!!!');
						return res.redirect('/login');
					})
					.catch((error) => {
						console.log('Registration Error: ' + error);
						return res.redirect('/register');
					});
			} else {
				console.log('Already Have Account, Please Sign in!');
				return res.redirect('/login');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getLogin = (req, res, next) => {
	res.render('login', { title: 'Sign In' });
};

exports.postLogin = (req, res, next) => {
	const { username, password } = req.body;

	User.findOne({ username: username, password: password })
		.then((result) => {
			if (!result) {
				console.log('Invalid Credential, Please Try Again!!!');
				return res.redirect('/login');
			}

			res.cookie(process.env.COOKIE_KEY, username, {
				maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			});
			console.log('Logged in Successfully!!!');
			return res.redirect('/');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.logout = (req, res, next) => {
	res.clearCookie(process.env.COOKIE_KEY);
	res.redirect('/login');
};
