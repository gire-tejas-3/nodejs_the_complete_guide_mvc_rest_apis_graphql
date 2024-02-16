const User = require('../model/user');
const ObjectId = require('mongodb').ObjectId;

exports.getAdmin = (req, res, next) => {
	const user = req.user || req.locals.user;

	User.fetchAll()
		.then((result) => {
			res.render('admin', {
				title: 'admin',
				user,
				users: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postAdmin = (req, res, next) => {
	const { username, email, password } = req.body;
	let terms, role;
	if (
		username.length > 3 &&
		email.includes('@') &&
		password.length > 6
	) {
		User.fetchByField({ username, email })
			.then((result) => {
				if (!result) {
					const user = new User(
						username,
						email,
						password,
						terms = "on",
						role = "user",
					);
					user.save()
						.then((result) => {
							console.log('New User Created');
							res.redirect('/admin');
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					res.redirect('/admin');
					throw 'User is already added';
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.redirect('/admin');
		console.log('Please enter valid data');
	}
};

exports.postUser = (req, res, next) => {
	const id = req.params.id;
	const body = req.body;

	User.update(id, body)
		.then((result) => {
			const currentCookie = process.env.COOKIE_KEY;

			if (currentCookie) {
				res.cookie(currentCookie, body.username, {
					maxAge: 3 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});
			}
			console.log('User Updated');
			res.redirect('/admin');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.deleteUser = (req, res, next) => {
	const id = new ObjectId(String(req.params.id));
	if (id === req.user._id) {
		res.redirect('/admin');
		return;
	}

	User.delete(id)
		.then((result) => {
			console.log('User Deleted!');
			return res.redirect('/admin');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getHome = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('index', { title: 'Home', user });
};
