// 3rd party packages
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');

// Setup enviroment variables
dotenv.config({ path: './config.env' });

// All route Handlers
const userRouter = require('./routes/userRoutes');
const creationRouter = require('./routes/creationRoutes');
const globalErrorHandler = require('./controllers/errorController');

// Db connection
const sequelize = require('./db');

// Models 
const Creation = require('./models/creationModel');
const User = require('./models/userModel');

// setup middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Welcome to Night Cafe Clone App');
});

app.use('/api/users', userRouter);
app.use('/api/creations', creationRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'failed',
		message: `Can't find ${req.originalUrl} on this server`
	});
});

app.use(globalErrorHandler);

User.hasMany(Creation, { constraints: true, OnDelete: 'CASECADE', foreignKey: 'userId'});
Creation.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync()
	.then(result => {
		const port = process.env.PORT || 3000;
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	})
	.catch(error => console.log(error));
