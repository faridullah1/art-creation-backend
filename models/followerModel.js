const Sequelize = require('sequelize');
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

module.exports = Follower;