const moment = require('moment');
const Leave = require('../../model/leave');
const { verifyCsrfToken } = require('../../utils/csrf');
const AppError = require('../../utils/error');

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
			next(new AppError(error, 500));
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
			next(new AppError(error, 500));
		});
};

exports.updateLeaveDetail = (req, res, next) => {
	const { status, _csrf } = req.body;
	const id = req.params.id;

	const csrfVerified = verifyCsrfToken(_csrf);
	if (!csrfVerified) {
		req.toastr.error('CSRF Validation Failed');
		return res.redirect('/');
	}

	Leave.findById(id)
		.then((result) => {
			if (result.status === 'approved' || result.status === 'rejected') {
				req.toastr.error('Approved and Rejected Leaves Cannot Change');
				return res.redirect(`/leaves`);
			}

			result.status = status;
			result
				.save()
				.then(() => {
					req.toastr.success(
						`Leave Status changed from PENDING to ${status.toUpperCase()}`,
					);
					return res.redirect('/leaves');
				})
				.catch((error) => {
					next(new AppError(error, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};

exports.getPendingLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({ status: 'pending' })
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
			next(new AppError(error, 500));
		});
};

exports.getApprovedLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({ status: 'approved' })
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
			next(new AppError(error, 500));
		});
};

exports.getRejectedLeaves = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({ status: 'rejected' })
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
			next(new AppError(error, 500));
		});
};
