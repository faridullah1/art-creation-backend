const SubscriptionPlan = require('../models/subscriptionPlanModel');


exports.createPlan = async (req, res, next) => {
	try {
		const { title, price, coins, benefits, isRecommended } = req.body;

		const plan = await SubscriptionPlan.create({
			title, price, coins, benefits, isRecommended
		});

		res.status(201).json({
			status: 'success',
			data: {
				plan
			}
		});
	}
	catch(err) {
		res.status(500).send(err);
	}
};

exports.getAllPlans = async (req, res, next) => {
	try {
		const plans = await SubscriptionPlan.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				plans
			}
		});
	}
	catch(err) {
		res.status(500).send(err);
	}
};

exports.updatePlan = async (req, res, next) => {
	try {
		const planId = +req.params.id;
		await SubscriptionPlan.update({ ...req.body }, { where: { planId }});

		res.status(200).json({
			status: 'success',
			data: null
		});
	}
	catch(err) {
		res.status(500).send(err);
	}
};

exports.deletePlan = async (req, res, next) => {
	try {
		const planId = +req.params.id;
		await SubscriptionPlan.destroy({ where: { planId }});

		res.status(204).json({
			status: 'success',
			data: null
		});
	}
	catch(err) {
		res.status(500).send(err);
	}
};