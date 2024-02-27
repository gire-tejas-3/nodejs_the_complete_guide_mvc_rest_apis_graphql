const express = require('express');
const leaveTypeController = require('../controller/admin/leaveType');

const router = express.Router();

router
	.route('/types/add')
	.get(leaveTypeController.getAddLeaveType)
	.post(leaveTypeController.postAddLeaveType);
	
router.get('/types', leaveTypeController.getAllLeaveTypes);
router.post('/types/:id', leaveTypeController.updateLeaveType);
router.post('/types/:id/delete', leaveTypeController.deleteLeaveType);

// Modify
router.route('/').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('all_leave', { title: 'All Leaves', user });
});

router.route('/:id').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('leave_details', { title: 'Leave Details', user });
});

router.route('/pending').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('pending_leave', { title: 'Pending Leaves', user });
});

router.route('/approved').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('pending_leave', { title: 'Approved Leaves', user });
});

router.route('/rejected').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('not_approve_leave', { title: 'Rejected Leaves', user });
});

module.exports = router;
