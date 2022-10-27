const Joi = require('joi');
const { Sequelize } = require('sequelize');
const db = require('../db');

const AdminUser = db.define('admin_user', {
	userId: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	name: {
		type: Sequelize.STRING(55),
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING(255),
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING(100),
		allowNull: false
	}
});

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(55).required(),
		email: Joi.string().email().min(3).max(255).required(),
		password: Joi.string().min(10).required()
	});

	return schema.validate(user);
}

exports.AdminUser = AdminUser;
exports.validate = validateUser;