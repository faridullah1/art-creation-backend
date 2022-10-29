const Sequelize = require('sequelize');
const Joi = require('joi');
const db = require('../db');

const SubscriptionPlan = db.define('subscription_plan', {
	planId: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	title: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	coins: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	benefits: {
		type: Sequelize.STRING(1000),
		allowNull: false
	},
	isRecommended: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

function validatePlan(plan) {
	const schema = Joi.object({
		title: Joi.string().min(3).max(255).required(),
		price: Joi.number().required(),
		coins: Joi.number().required(),
		benefits: Joi.string().required().max(1000),
		isRecommended: Joi.boolean()
	});

	return schema.validate(plan);
}

exports.validate = validatePlan;
exports.SubscriptionPlan = SubscriptionPlan;