const LeaveType = require('../../model/leaveType');
const { verifyCsrfToken } = require('../../utils/csrf');

exports.getAddLeaveType = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('add_leave_type', {
		title: 'Add Leave Types',
		user,
	});
};

exports.postAddLeaveType = (req, res, next) => {
	const { leaveType, description, maxDaysAllowed, _csrf } = req.body;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	LeaveType.findOne({ leaveType: leaveType })
		.then((result) => {
			if (!result) {
				const leaveTypes = new LeaveType({
					leaveType: leaveType,
					description: description,
					maxDaysAllowed: maxDaysAllowed,
				});

				leaveTypes
					.save()
					.then((result) => {
						req.toastr.success('Added New Leave Type');
						return res.redirect('/leaves/types');
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				req.toastr.error('This Leave Type is Already Registered');
				return res.redirect('/leaves/types/add');
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getAllLeaveTypes = (req, res, next) => {
	const user = req.user || req.locals.user;
	LeaveType.find()
		.then((result) => {
			res.render('manage_leave_type', {
				title: 'Leaves',
				user,
				leaveTypes: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateLeaveType = (req, res, next) => {
	const id = req.params.id;
	const { leaveType, description, maxDaysAllowed, _csrf } = req.body;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	LeaveType.findByIdAndUpdate(id, {
		leaveType: leaveType,
		description: description,
		maxDaysAllowed: maxDaysAllowed,
	})
		.then((result) => {
			req.toastr.success('Leave Type Updated!');
			return res.redirect('/leaves/types');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.deleteLeaveType = (req, res, next) => {
	const id = req.params.id;
	LeaveType.findByIdAndDelete(id)
		.then((result) => {
			req.toastr.success('Leave Type Deleted!');
			return res.redirect('/leaves/types');
		})
		.catch((error) => {
			console.log(error);
		});
};
