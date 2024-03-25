const crypto = require('crypto');
const fs = require('fs');
const Departments = require('../../model/departments');
const Designation = require('../../model/designation');
const Leave = require('../../model/leave');
const User = require('../../model/user');
const Token = require('../../model/token');
const sendMail = require('../../utils/mailgun');
const { verifyCsrfToken } = require('../../utils/csrf');
const AppError = require('../../utils/error');

exports.getAllUsers = async (req, res, next) => {
	const user = req.user || req.locals.user;
	const limit = parseInt(req.query.limit) || 5;
	const page = parseInt(req.query.page) || 1;
	const sortField = req.query.field || '_id';
	const order = parseInt(req.query.order) || -1;
	const searchField = req.query.search || '';
	
	const totalUsers = await User.countDocuments();
	const sortOrder = order === 1 ? -1 : 1;
	const skip = (page - 1) * limit;
	const currentPage = page;
	const nextPage = currentPage + 1;
	const previousPage = currentPage - 1;
	const hasNextPage = currentPage * limit < totalUsers;
	const hasPreviousPage = currentPage > 1;
	const totalPages = Math.ceil(totalUsers / limit);

	const sort = {};
	sort[sortField] = sortOrder;
	let search = {};

	if (searchField) {
		search = {
			$or: [
				{ firstname: { $regex: searchField, $options: 'i' } },
				{ middlename: { $regex: searchField, $options: 'i' } },
				{ lastname: { $regex: searchField, $options: 'i' } },
				{ email: { $regex: searchField, $options: 'i' } },
				{ username: { $regex: searchField, $options: 'i' } },
				{ role: { $regex: searchField, $options: 'i' } },
				{ gender: { $regex: searchField, $options: 'i' } },
			],
		};
	}

	User.find(search)
		.populate(['department', 'designation'])
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.then((result) => {
			res.status(200).render('manage_user', {
				title: 'Users',
				user,
				users: result,
				nextPage,
				currentPage,
				previousPage,
				hasNextPage,
				hasPreviousPage,
				totalPages,
				limit,
				order: sortOrder,
				field: sortField,
				search: searchField
			});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.getAddUsers = (req, res, next) => {
	const user = req.user || req.locals.user;
	Promise.all([Designation.find(), Departments.find()])
		.then(([designations, departments]) => {
			res.render('add_user', {
				title: 'Add Users',
				user,
				designations: designations,
				departments: departments,
			});
		})
		.catch((error) => {
			next(new AppError(error, 500));
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
		_csrf,
		recaptchaToken,
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
		email: email,
		username: username,
		password: password,
		role: role,
		gender: gender,
		dateOfBirth: dateOfBirth,
		department: department,
		designation: designation,
		isActive: isActive,
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

	User.findOne({ username: username, email: email })
		.then((result) => {
			if (result) {
				const id = result._id;
				return res.redirect(`/user/${id}`);
			}

			const user = new User(data);

			user.save()
				.then((usr) => {
					const token = new Token({
						userId: usr._id,
						token: crypto.randomBytes(18).toString('hex'),
					});

					token
						.save()
						.then(async (_token) => {
							const subject = `Confirm Your Email Address`;

							const html = {
								subject: subject,
								content:
									'Please verify your account with following link: ',
								link: `${req.protocol}://${req.get(
									'host',
								)}/verify/${usr._id}/${_token.token}`,
								button: 'Verify',
							};

							await sendMail(email, subject, html);
							req.toastr.success('New User Created!');
							return res.redirect('/user');
						})
						.catch((err) => {
							next(new AppError(err, 500));
						});
				})
				.catch((errors) => {
					next(new AppError(errors, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.getAddUser = (req, res, next) => {
	const id = req.params.id;
	const user = req.user || req.locals.user;

	if (id.toString() === user._id.toString()) {
		return res.redirect('/account');
	}

	Promise.all([User.findById(id), Designation.find(), Departments.find()])
		.then(([users, designations, departments]) => {
			res.render('update_user', {
				title: 'Update User',
				user,
				users,
				designations,
				departments,
			});
		})
		.catch((error) => {
			next(new AppError(error, 500));
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
		role,
		dateOfBirth,
		department,
		designation,
		isActive,
		_csrf,
		recaptchaToken,
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
		role: role,
		dateOfBirth: dateOfBirth,
		department: department,
		designation: designation,
		isActive: isActive,
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

	User.findById(id)
		.then((result) => {
			result
				.updateOne(data)
				.then((reslt) => {
					req.toastr.success('User Updated!');
					return res.redirect('/user');
				})
				.catch((error) => {
					next(new AppError(error, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.deleteUser = (req, res, next) => {
	const id = req.params.id;
	const user = req.user || req.locals.user;

	User.findById(id)
		.then((result) => {
			if (result._id.toString() === user._id.toString()) {
				return res.redirect('/user');
			}

			if (result.isActive) {
				return result
					.updateOne({
						isActive: false,
					})
					.then(() => {
						req.toastr.success('User InActived!!!');
						return res.redirect('/user');
					})
					.catch((error) => {
						next(new AppError(error, 500));
					});
			}

			return Leave.find({ userId: result._id })
				.then((leaves) => {
					if (leaves.length > 0) {
						return Leave.deleteMany({
							_id: { $in: leaves.map((leav) => leav._id) },
						});
					}
				})
				.then(() => {
					return result.deleteOne();
				})
				.then(() => {
					req.toastr.success(`User Deleted !!`);
					return res.redirect('/user');
				})
				.catch((error) => {
					next(new AppError(error, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};
