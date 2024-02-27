const moment = require('moment');
const LeaveType = require('../../model/leaveType');

exports.getAddLeaveType = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('add_leave_type', {
		title: 'Add Leave Types',
		user,
	});
};

exports.postAddLeaveType = (req, res, next) => {
	const { leaveType, description, maxDaysAllowed } = req.body;

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
						console.log('Added New Leave Type');
						return res.redirect('/leaves/types');
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				console.log('This Leave Type is Already Registered');
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
	const { leaveType, description, maxDaysAllowed } = req.body;

	LeaveType.findByIdAndUpdate(id, {
		leaveType: leaveType,
		description: description,
		maxDaysAllowed: maxDaysAllowed,
	})
		.then((result) => {
			console.log('Leave Type Updated!');
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
			console.log('Leave Type Deleted!');
			return res.redirect('/leaves/types');
		})
		.catch((error) => {
			console.log(error);
		});
};
