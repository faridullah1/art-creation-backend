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
const likesRouter = require('./routes/likesRoutes');
const followerRouter = require('./routes/followerRoutes');
const subscriptionPlanRouter = require('./routes/subscriptionPlanRoutes');

const globalErrorHandler = require('./controllers/errorController');

// Db connection
const sequelize = require('./db');

// setup middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/status', (req, res) => res.send({status: "I'm up and running"}));

app.use('/users', userRouter);
app.use('/creations', creationRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/followers', followerRouter);
app.use('/plans', subscriptionPlanRouter);


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
