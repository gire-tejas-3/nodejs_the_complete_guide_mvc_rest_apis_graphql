const User = require('../model/user');

exports.getRegister = (req, res, next) => {
	res.render('register.ejs', { title: 'Register' });
};

exports.postRegister = (req, res, next) => {
	const { terms, username, email, password, role } = req.body;
	if (
		terms === 'on' &&
		username.length > 3 &&
		email.includes('@') &&
		password.length > 6
	) {
		const registerUser = new User(terms, username, email, password, role);
		registerUser
			.save()
			.then(() => {
				res.redirect('/login');
				console.log('You have Successfully created your account');
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.redirect('/register');
		console.log('Please fill form and accept the terms');
	}
};

exports.getLogin = (req, res, next) => {
	res.render('login', { title: 'Sign In' });
};

exports.postLogin = (req, res, next) => {
	const { email, password, rememberMe } = req.body;

	User.fetchByField({ email, password })
		.then(([data]) => {
			if (!data || data.length === 0) {
				console.log('Invalid Credential!');
				return res.redirect('/login');
			} else {
				const cookieMaxAge = rememberMe
					? 3 * 24 * 60 * 60 * 1000
					: 15 * 60 * 1000;

				res.cookie(process.env.COOKIE_KEY, data[0].username, {
					maxAge: cookieMaxAge,
					httpOnly: true,
				});
				console.log("Logged In Successfully!");
				return res.redirect('/');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
