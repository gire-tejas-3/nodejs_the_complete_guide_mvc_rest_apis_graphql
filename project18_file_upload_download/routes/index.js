const express = require('express');
const protected = require('../controller/protectedRoutes');
const adminController = require('../controller/admin/index');
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
router.use(protected.updateAccount);
router.use('/', empRoutes);
// router.use(protected.adminProtectedRoutes);
router.route('/dashboard').get(adminController.getDashboard);
router.use('/account', accountRoutes);
router.use('/department', departmentRoutes);
router.use('/designation', designationRoutes);
router.use('/leaves', leaveTypeRoutes);
router.use('/user', usersRoutes);

module.exports = router;
