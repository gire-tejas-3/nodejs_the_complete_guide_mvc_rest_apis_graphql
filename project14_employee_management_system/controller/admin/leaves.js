const moment = require('moment');
const leaveTypeController = require('../../controller/admin/leaveType');
const Leave = require('../../model/leave');

exports.getAllLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({})
		.populate('userId')
		.populate('leaveType')
		.sort({ appliedDate: -1 })
		.then((result) => {
			res.render('all_leave', {
				title: 'All Leaves',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getLeaveDetail = (req, res, next) => {
	const user = req.user || req.locals.user;
	const id = req.params.id;
	Leave.findById(id)
		.populate([
			{ path: 'leaveType' },
			{
				path: 'userId',
				populate: {
					path: 'designation',
					model: 'Designation',
					populate: {
						path: 'departmentId',
						model: 'Department',
					},
				},
			},
		])
		.then((result) => {
			res.render('leave_details', {
				title: 'Leave Details',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateLeaveDetail = (req, res, next) => {
	const { status } = req.body;
	const id = req.params.id;

	Leave.findById(id)
		.then((result) => {
			if (result.status === 'approved' || result.status === 'rejected') {
				console.log('Approved and Rejected Leaves Cannot Change');
				return res.redirect(`/leaves`);
			}

			result.status = status;
			result
				.save()
				.then(() => {
					return res.redirect('/leaves');
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getPendingLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({status: 'pending'})
		.populate('userId')
		.populate('leaveType')
		.sort({ appliedDate: -1 })
		.then((result) => {
			res.render('all_leave', {
				title: 'All Leaves',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getApprovedLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({status: 'approved'})
		.populate('userId')
		.populate('leaveType')
		.sort({ appliedDate: -1 })
		.then((result) => {
			res.render('all_leave', {
				title: 'All Leaves',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getRejectedLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({status: 'rejected'})
		.populate('userId')
		.populate('leaveType')
		.sort({ appliedDate: -1 })
		.then((result) => {
			res.render('all_leave', {
				title: 'All Leaves',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};