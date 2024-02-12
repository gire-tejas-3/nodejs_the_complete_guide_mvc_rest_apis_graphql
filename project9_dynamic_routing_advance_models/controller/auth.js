const Register = require('../model/register');

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
		const registerUser = new Register(
			terms,
			username,
			email,
			password,
			role,
		);
		registerUser.save();
		res.redirect('/login');
		return;
	}
	console.log('Please fill form and accept the terms');
	res.redirect('/register');
};

exports.getLogin = (req, res, next) => {
	res.render('login', { title: 'Sign In' });
};

exports.postLogin = (req, res, next) => {
	const { email, password, rememberMe } = req.body;
	Register.fetchAll((exsistingData) => {
		const exsistUserData = exsistingData.find(
			(exsistedUser) =>
				exsistedUser.email === email &&
				exsistedUser.password === password,
		);

		if (exsistUserData === undefined || !exsistUserData) {
			console.log('Dont have account? Please Signup');
			return res.redirect('/register');
		} else {
			const cookieMaxAge = rememberMe
				? 3 * 24 * 60 * 60 * 1000
				: 15 * 60 * 1000;

			res.cookie(process.env.COOKIE_KEY, exsistUserData.username, {
				maxAge: cookieMaxAge,
				httpOnly: true,
			});

			return res.redirect('/');
		}
	});
};
