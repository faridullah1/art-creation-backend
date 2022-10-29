const Sequelize = require('sequelize');
const Joi = require('joi');

const db = require('../db');

const User = db.define('user', {
	userId: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	email: {
		type: Sequelize.STRING(255),
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING(55),
		allowNull: false,
	}
});

function validateUser(user) {
	const schema = Joi.object({
		email: Joi.string().email().min(3).max(255).required(),
		name: Joi.string().min(3).required()
	});

	return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;