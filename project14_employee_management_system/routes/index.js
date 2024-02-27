const express = require('express');
const protected = require('../controller/protectedRoutes');
const authRoutes = require('./auth');
const departmentRoutes = require('./department');
const designationRoutes = require('./designation');
const leaveTypeRoutes = require('./leaves');
const usersRoutes = require('./user');
const accountRoutes = require('./account');
const adminController = require('../controller/admin/index');

const router = express.Router();

router.use(authRoutes);
router.use(protected.protectedRoutes);
router.route('/').get(adminController.getDashboard);
router.use('/department', departmentRoutes);
router.use('/designation', designationRoutes);
router.use('/leaves', leaveTypeRoutes);
router.use('/user', usersRoutes);
router.use('/account', accountRoutes);

// reports
router.route('/reports').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('reports', { title: 'Reports', user });
});

// user
router.route('/leave/apply').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('apply_leave', { title: 'Apply Leave', user });
});

router.route('/leave').get((req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('leave_status', { title: 'Leave Status', user });
});


module.exports = router;
