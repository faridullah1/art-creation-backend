const express = require('express');
const router = express.Router();
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

router.route('/')
	.get(subscriptionPlanController.getAllPlans)
	.post(subscriptionPlanController.createPlan);

router.route('/:id')
	.patch(subscriptionPlanController.updatePlan)
	.delete(subscriptionPlanController.deletePlan);

module.exports = router;