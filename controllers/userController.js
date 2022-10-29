const { User, validate } = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.me = catchAsync(async (req, res, next) => {
	const loggedInUser = await User.findOne({ where: { email: req.user.email }});

	res.status(200).json({
		status: 'success',
		data: {
			loggedInUser
		}
	});
})

exports.createUser = catchAsync(async (req, res, next) => {
	const { error } = validate(req.user);
	if (error) return next(new AppError(error.message, 400));

	const { email, name } = req.user;
	const user = await User.findOne({ where: { email }});

	if (user) return next(new AppError('User already exists', 403));

	const resp = await User.create({
		email, name
	});

	res.status(201).json({
		status: 'success',
		data: {
			user: resp
		}
	});
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		data: {
			users
		}
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const userId = req.params.id;
	const user = await User.findByPk(userId);

	if (!user) return next(new AppError('No record found with given Id', 404));
	
	const { email, name } = req.body;

	user.name = name;
	user.email = email;

	const updatedUser = await user.save();

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser
		}
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const userId = req.params.id;
	const user = await User.destroy({ where: { userId }});

	if (!user) return next(new AppError('No record found with given Id', 404));

	res.status(204).json({
		status: 'success',
		data: {
			user
		}
	});
});