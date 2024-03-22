const express = require('express');
const deptController = require('../controller/admin/department');

const router = express.Router();

router.get('/', deptController.getAllDepartments);

router
	.route('/add')
	.get(deptController.getAddDepartments)
	.post(deptController.postAddDepartments);

router.post('/:id', deptController.updateDepartment);

router.post('/:id/delete', deptController.deleteDepartment);

module.exports = router;