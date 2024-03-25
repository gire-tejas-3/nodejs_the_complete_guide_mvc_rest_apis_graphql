const express = require('express');
const empController = require('../controller/employee/index');
const router = express.Router();

router.route('/').get(empController.getDashboard);

router
	.route('/leave/apply')
	.get(empController.getApplyLeave)
	.post(empController.postApplyLeave);

router.route('/leave').get(empController.getAllLeave);

module.exports = router;
