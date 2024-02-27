const Departments = require('../../model/departments');
const Designation = require('../../model/designation');
const User = require('../../model/user');

exports.getAllUsers = (req, res, next) => {
	const user = req.user || req.locals.user;
	User.find()
		.then((result) => {
			res.render('manage_user', {
				title: 'Users',
				user,
				users: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getAddUsers = (req, res, next) => {
	const user = req.user || req.locals.user;
	Promise.all([Departments.find(), Designation.find()])
		.then(([departments, designations]) => {
			res.render('add_user', {
				title: 'Add Users',
				user,
				departments,
				designations,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.postAddUsers = (req, res, next) => {
	const {
		firstname,
		middlename,
		lastname,
		contact,
		email,
		username,
		password,
		role,
		gender,
		dateOfBirth,
		department,
		designation,
		isActive,
		profileImage,
	} = req.body;

	User.findOne({ username: username, email: email })
		.then((result) => {
			if (result) {
				result
					.updateOne({
						firstname: firstname,
						middlename: middlename,
						lastname: lastname,
						contact: contact,
						gender: gender,
						dateOfBirth: dateOfBirth,
						department: department,
						designation: designation,
						isActive: isActive,
						profileImage: profileImage,
					})
					.then((reslt) => {
						console.log('User Updated!');
						return res.redirect('/user');
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				const user = new User({
					firstname: firstname,
					middlename: middlename,
					lastname: lastname,
					contact: contact,
					role: role,
					gender: gender,
					dateOfBirth: dateOfBirth,
					department: department,
					designation: designation,
					isActive: isActive,
					profileImage: profileImage,
					username: username,
					password: password,
					email: email,
				});

				user.save()
					.then(() => {
						console.log('New User Created!');
						return res.redirect('/user');
					})
					.catch((error) => {
						console.log(error);
					});
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getAddUser = (req, res, next) => {
	const id = req.params.id;
	const user = req.user || req.locals.user;

	if(id.toString() === user._id.toString()) {
		return res.redirect('/account')
	};

	Promise.all([User.findById(id), Departments.find(), Designation.find()])
		.then(([users, departments, designations]) => {
			res.render('update_user', {
				title: 'Update User',
				user,
				users,
				departments,
				designations,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateUser = (req, res, next) => {
	const id = req.params.id;
	const {
		firstname,
		middlename,
		lastname,
		contact,
		gender,
		dateOfBirth,
		department,
		designation,
		isActive,
		profileImage,
	} = req.body;

	User.findByIdAndUpdate(id)
		.then((result) => {
			result
				.updateOne({
					firstname: firstname,
					middlename: middlename,
					lastname: lastname,
					contact: contact,
					gender: gender,
					dateOfBirth: dateOfBirth,
					department: department,
					designation: designation,
					isActive: isActive,
					profileImage: profileImage,
				})
				.then((reslt) => {
					console.log('User Updated!');
					return res.redirect('/user');
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.deleteUser = (req, res, next) => {
	const id = req.params.id;
	const user =  req.user || req.locals.user;

	User.findById(id)
		.then((result) => {
			if (result._id.toString() === user._id.toString()) return res.redirect('/user');
			result
				.deleteOne()
				.then(() => {
					console.log('User Deleted!!!');
					return res.redirect('/user');
				})
				.catch((errror) => {
					console.log(errror);
				});
		})
		.catch((error) => {
			console.log(error);
		});
};
