const Register = require('../model/register');

exports.getRegister = (req, res, next) => {
	res.render('register.ejs', { title: 'Register' });
};

exports.postRegister = (req, res, next) => {
	const { terms, username, email, password } = req.body;
	if (
		terms === 'on' &&
		username.length > 3 &&
		email.includes('@') &&
		password.length > 6
	) {
		const registerUser = new Register(terms, username, email, password);
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
	const { email, password } = req.body;
	Register.fetchAll((exsistingData) => {
		const exsistUserData = exsistingData.find(
			(exsistedUser) =>
				exsistedUser.email === email &&
				exsistedUser.password === password,
		);

		if (exsistUserData === undefined) {
			console.log("Don't have an account yet?  Sign Up");
			return res.redirect('/register');
		} else {
			req.session.isAuthenticated = true;
			return res.redirect('/')
		}
	});
};
