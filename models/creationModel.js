const Joi = require('joi');
const Sequelize = require('sequelize');
const db = require('../db');

const Creation = db.define('creation', {
	creationId: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	prompt: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	modelType: {
		type: Sequelize.STRING(55),
		allowNull: false,
	},
	outputImage: {
		type: Sequelize.STRING,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('Default', 'Published', 'Archived'),
		defaultValue: 'Default' 
	},
	description: Sequelize.STRING(255),
	likes: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

function validateCreation(obj) {
	const schema = Joi.object({
		prompt: Joi.string().max(255).required(),
		modelType: Joi.string().max(55).required()
	});

	return schema.validate(obj);
}

exports.validate = validateCreation;
exports.Creation = Creation;