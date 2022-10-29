const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { AdminUser, validate } = require('../models/adminUserModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
	const { error } = validateLogin(req.body);
	if (error) return next(new AppError(error.message, 400));

	let user = await AdminUser.findOne({ where: { email: req.body.email } });
	if (!user) return next(new AppError('Invalid email or password.', 400));

	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return next(new AppError('Invalid email or password.', 400));

	const token = generateAuthToken(user);

	res.status(200).send({
		status: 'success',
		access_token: token,
		user
	});
});

exports.signUp = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	const { name, email, password } = req.body;

	let user = await AdminUser.findOne({ where: { email: req.body.email } });
	if (user) return next(new AppError('User already registered.', 400));

	const admin = await AdminUser.create({
		name, email, password
	});

	const salt = await bcrypt.genSalt(10);
	admin.password = await bcrypt.hash(admin.password, salt);

	await admin.save();

	const token = generateAuthToken(admin);

	res.setHeader('x-auth-token', token);
	res.setHeader('access-control-expose-headers', 'x-auth-token');

	res.status(201).send({
		status: 'success',
		data: {
			name: admin.name,
			email: admin.email
		}
	});
});

function generateAuthToken(user) {
	return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: process.env.JWT_EXPIRY
	});
}

function validateLogin(req) {
	const schema = Joi.object({
		email: Joi.string().email().min(3).max(255).required(),
		password: Joi.string().min(10).required()
	});

	return schema.validate(req); 
}