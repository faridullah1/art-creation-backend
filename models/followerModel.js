const Sequelize = require('sequelize');
const Joi = require('joi');
const db = require('../db');
const User = require('./userModel');

const Follower = db.define('follower', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true	
	},
	userId: {
		type: Sequelize.INTEGER,
	
		references: {
		  	model: User,
		 	key: 'userId',
		}
	},
	followById: {
		type: Sequelize.INTEGER,
	
		references: {
		  	model: User,
		 	key: 'userId',
		}
	}
});

function validateFollower(obj) {
	const schema = Joi.object({
		userId: Joi.number().required()
	});

	return schema.validate(obj);
}

exports.validate = validateFollower
exports.Follower = Follower;