const Sequelize = require('sequelize');
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

module.exports = User;