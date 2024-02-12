const Register = require('../model/register');

exports.getAdmin = (req, res, next) => {
	const id = req.params.id;
	const user = req.user || req.locals.user;
	Register.fetchAll((exsistingData) => {
		res.render('admin', {
			title: 'Admin',
			users: exsistingData,
			user,
			id,
		});
	});
};

exports.postUser = (req, res, next) => {
	const id = parseInt(req.params.id);
	const data = req.body;
	Register.update(id, data, (result) => {
		res.redirect('/admin');
	});
};

exports.deleteUser = (req, res, next) => {
	const id = parseInt(req.params.id);
	if (id === req.user.id) {
		res.redirect('/admin');
		return;
	}
	Register.delete(id, (result) => {
		console.log(result);
		res.redirect('/admin');
	});
};

exports.getHome = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('index', { title: 'Home', user });
};
