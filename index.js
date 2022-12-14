// 3rd party packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

// Setup enviroment variables
dotenv.config({ path: './config.env' });

// All route Handlers
const userRouter = require('./routes/userRoutes');
const creationRouter = require('./routes/creationRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const likesRouter = require('./routes/likesRoutes');
const followerRouter = require('./routes/followerRoutes');
const subscriptionPlanRouter = require('./routes/subscriptionPlanRoutes');
const authRouter = require('./routes/authRoutes');

const globalErrorHandler = require('./controllers/errorController');

// Db connection
const sequelize = require('./db');
const AppError = require('./utils/appError');

// setup middlewares
const corsOptions = {
	origin: 'https://admin.talkart.io/'
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
app.use('/auth', authRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
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
