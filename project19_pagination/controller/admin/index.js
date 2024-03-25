const AppError = require('../../utils/error');
const User = require('../../model/user');
const Leave = require('../../model/leave');

exports.getDashboard = (req, res, next) => {
	const user = req.user || req.locals.user;
	User.countDocuments()
		.then((employees) => {
			Leave.find()
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
					res.render('admin', {
						title: 'Home',
						user,
						employees,
						totalLeave,
						approvedLeave,
						rejectedLeave,
						pendingLeave,
					});
				})
				.catch((error) => {
					next(new AppError(error, 500));
				});
		})
		.catch((error) => {
			next(new AppError(error, 500));
		});
};
