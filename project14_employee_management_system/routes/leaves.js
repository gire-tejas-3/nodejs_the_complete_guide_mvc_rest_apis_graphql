const express = require('express');
const moment = require('moment');
const leaveTypeController = require('../controller/admin/leaveType');
const leavesController = require('../controller/admin/leaves');
const Leave = require('../model/leave');

const router = express.Router();

router.get('/types', leaveTypeController.getAllLeaveTypes);
router
	.route('/types/add')
	.get(leaveTypeController.getAddLeaveType)
	.post(leaveTypeController.postAddLeaveType);
router
	.post('/types/:id', leaveTypeController.updateLeaveType);
router
	.post('/types/:id/delete', leaveTypeController.deleteLeaveType);
router
	.route('/')
	.get(leavesController.getAllLeaves);
router
	.route('/pending')
	.get(leavesController.getPendingLeaves);
router
	.route('/approved')
	.get(leavesController.getApprovedLeaves);
router
	.route('/rejected')
	.get(leavesController.getRejectedLeaves);
router
	.route('/:id')
	.get(leavesController.getLeaveDetail)
	.post(leavesController.updateLeaveDetail);

module.exports = router;
