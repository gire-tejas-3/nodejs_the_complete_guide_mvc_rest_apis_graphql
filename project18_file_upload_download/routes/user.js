const express = require('express');
const userController = require('../controller/admin/user');

const router = express.Router();

router.route('/').get(userController.getAllUsers);
router
	.route('/add')
	.get(userController.getAddUsers)
	.post(userController.postAddUsers);

router
	.route('/:id')
	.get(userController.getAddUser)
	.post(userController.updateUser);

router.route('/:id/delete').post(userController.deleteUser);

module.exports = router;
