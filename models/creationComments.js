const Joi = require('joi');
const Sequelize = require('sequelize');
const db = require('../db');

const CreationComment = db.define('creation_comment', {
	commentId: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	comment: {
		type: Sequelize.STRING(255),
		allowNull: false,
	}
});

function validateComment(comment) {
	const schema = Joi.object({
		creationId: Joi.number().required(),
		comment: Joi.string().max(255).required()
	});

	return schema.validate(comment);
}

exports.validate = validateComment;
exports.CreationComment = CreationComment;