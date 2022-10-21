const Sequelize = require('sequelize');
const connection = new Sequelize('ai_art', 'root', 'admin', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = connection;