const User = require('../model/user');

exports.getAdmin = (req, res, next) => {
	const user = req.user || req.locals.user;
	User.findAll()
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

	// User.fetchAll()
	// 	.then(([data]) => {
	// 		res.render('admin', {
	// 			title: 'admin',
	// 			user,
	// 			users: data,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

exports.postUser = (req, res, next) => {
	const id = parseInt(req.params.id);
	const body = req.body;

	User.update({ ...body }, { where: { id: id } })
		.then((data) => {
			console.log('User Updated');
			res.redirect('/admin');
		})
		.catch((err) => {
			console.log(err);
		});

	// User.update(id, body)
	// 	.then(([data]) => {
	// 		console.log("User Updated")
	// 		res.redirect('/admin');
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

exports.deleteUser = (req, res, next) => {
	const id = parseInt(req.params.id);
	if (id === req.user.id) {
		res.redirect('/admin');
		return;
	}

	User.destroy({ where: { id } })
		.then(() => {
			console.log('User Deleted!');
			return res.redirect('/admin');
		})
		.catch((err) => {
			console.log(err);
		});

	// User.delete(id)
	// 	.then(() => {
	// 		console.log('User Deleted!');
	// 		return res.redirect('/admin');
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

exports.getHome = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('index', { title: 'Home', user });
};
