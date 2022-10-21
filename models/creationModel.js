const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('creation', {
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
	}
});

module.exports = User;