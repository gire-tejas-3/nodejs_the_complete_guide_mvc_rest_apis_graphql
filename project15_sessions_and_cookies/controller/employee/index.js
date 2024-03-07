const moment = require('moment');
const LeaveType = require('../../model/leaveType');
const Leave = require('../../model/leave');

exports.getDashboard = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({ userId: user._id })
		.populate('leaveType')
		.then((result) => {
			const totalLeave = result.length;
			const approvedLeave = result.filter(
				(leave) => leave.status === 'approved',
			).length;
			const rejectedLeave = result.filter(
				(leave) => leave.status === 'rejected',
			).length;
			const pendingLeave = result.filter(
				(leave) => leave.status === 'pending',
			).length;
			res.render('employee', {
				title: 'Home',
				user,
				totalLeave,
				approvedLeave,
				rejectedLeave,
				pendingLeave,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getApplyLeave = (req, res, next) => {
	const user = req.user || req.locals.user;
	LeaveType.find()
		.then((result) => {
			res.render('apply_leave', {
				title: 'Apply Leave',
				user,
				leaveType: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.postApplyLeave = (req, res, next) => {
	const user = req.user || req.locals.user;
	const { leaveType, description, fromDate, toDate } = req.body;

	Leave.create({
		userId: user._id,
		description: description,
		leaveType: leaveType,
		fromDate: fromDate,
		toDate: toDate,
	})
		.then((rs) => {
			console.log('Leave Applied');
			res.redirect('/leave');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getAllLeave = (req, res, next) => {
	const user = req.user || req.locals.user;
	Leave.find({ userId: user._id })
		.populate('leaveType')
		.populate('userId')
		.then((result) => {
			res.render('leave_status', {
				title: 'Leave Status',
				user,
				leaves: result,
				moment,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};
