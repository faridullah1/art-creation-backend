const { SubscriptionPlan, validate } = require('../models/subscriptionPlanModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createPlan = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message), 400);

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
})

exports.getAllPlans = catchAsync(async (req, res, next) => {
	const plans = await SubscriptionPlan.findAll();

	res.status(200).json({
		status: 'success',
		data: {
			plans
		}
	});
});

exports.updatePlan = catchAsync(async (req, res, next) => {
	const planId = +req.params.id;
	await SubscriptionPlan.update({ ...req.body }, { where: { planId }});	
	
	res.status(200).json({
		status: 'success',
		data: null
	});
});

exports.deletePlan = catchAsync(async (req, res, next) => {
	const planId = +req.params.id;
	await SubscriptionPlan.destroy({ where: { planId }});

	res.status(204).json({
		status: 'success',
		data: null
	});
})