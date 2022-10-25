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
const commentsRouter = require('./routes/commentsRoutes');
const followerRouter = require('./routes/followerRoutes');
const globalErrorHandler = require('./controllers/errorController');

// Db connection
const sequelize = require('./db');

// setup middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.send('Welcome to Night Cafe Clone App');
});

app.use('/api/users', userRouter);
app.use('/api/creations', creationRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/followers', followerRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'failed',
		message: `Can't find ${req.originalUrl} on this server`
	});
});

app.use(globalErrorHandler);

// Run the migration to populate database with the tables
require('./migration.js')();

sequelize.sync()
	.then(() => {
		const port = process.env.PORT || 3000;
		
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	})
	.catch(error => console.log(error));
