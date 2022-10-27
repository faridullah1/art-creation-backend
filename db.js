const Sequelize = require('sequelize');
console.log(process.env);
const connection = new Sequelize(process.env.DATABASE??'ai_art', process.env.DATABASE_USER??'root', process.env.USER_PASSWORD??'mysql', {
	dialect: process.env.dialect??'mysql',
	host: process.env.HOST??'mysql'
});

module.exports = connection;
