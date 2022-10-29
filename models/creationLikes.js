const Joi = require('joi');
const Sequelize = require('sequelize');
const db = require('../db');

const CreationLike = db.define('creation_like', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	
});

function validateLike(obj) {
	const schema = Joi.object({
		creationId: Joi.number().required(),
		userId: Joi.number().required()
	});

	return schema.validate(obj);
}

exports.validate = validateLike;
exports.CreationLike = CreationLike;