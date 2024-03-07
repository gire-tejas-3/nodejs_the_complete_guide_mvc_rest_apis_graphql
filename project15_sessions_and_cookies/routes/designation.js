const router = require('express').Router();

const designationController = require('../controller/admin/designation');

router.get('/', designationController.getAllDesignations);

router
	.route('/add')
	.get(designationController.getAddDesignation)
	.post(designationController.postAddDesignation);

router.post('/:id', designationController.updateDesignation);

router.post('/:id/delete', designationController.deleteDesignation);

module.exports = router;
