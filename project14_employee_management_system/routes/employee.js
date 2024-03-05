const express = require('express');
const empController = require('../controller/employee/index');
const adminController = require('../controller/admin/index');
const router = express.Router();

router.route('/').get(empController.getDashboard);

router.route('/dashboard').get(adminController.getDashboard);

router
	.route('/leave/apply')
	.get(empController.getApplyLeave)
	.post(empController.postApplyLeave);

router.route('/leave').get(empController.getAllLeave);

module.exports = router;
