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

module.exports = CreationLike;