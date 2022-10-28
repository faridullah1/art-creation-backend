const express = require('express');
const router = express.Router();
const subscriptionPlanController = require('../controllers/subscriptionPlanController');
const { admin } = require('../middleware/admin');

router.route('/')
	.get(subscriptionPlanController.getAllPlans)
	.post(admin, subscriptionPlanController.createPlan);

router.route('/:id')
	.patch(admin, subscriptionPlanController.updatePlan)
	.delete(admin, subscriptionPlanController.deletePlan);

module.exports = router;