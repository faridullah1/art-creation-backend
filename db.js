const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.USER_PASSWORD, {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = connection;