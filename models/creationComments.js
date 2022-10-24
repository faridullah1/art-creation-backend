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

module.exports = CreationComment;