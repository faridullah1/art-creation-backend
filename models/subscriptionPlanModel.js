const Sequelize = require('sequelize');
const db = require('../db');

const subscriptionPlan = db.define('subscription_plan', {
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
	}
});

module.exports = subscriptionPlan;