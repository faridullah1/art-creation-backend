const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.USER_PASSWORD, {
	dialect: process.env.dialect,
	host: process.env.HOST
});

module.exports = connection;