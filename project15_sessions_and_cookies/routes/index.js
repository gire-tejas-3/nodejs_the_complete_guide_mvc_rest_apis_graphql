const express = require('express');
const protected = require('../controller/protectedRoutes');
const authRoutes = require('./auth');
const departmentRoutes = require('./department');
const designationRoutes = require('./designation');
const leaveTypeRoutes = require('./leaves');
const usersRoutes = require('./user');
const accountRoutes = require('./account');
const empRoutes = require('./employee');

const router = express.Router();

router.use(authRoutes);
router.use(protected.protectedRoutes);
router.use('/', empRoutes);
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

module.exports = router;