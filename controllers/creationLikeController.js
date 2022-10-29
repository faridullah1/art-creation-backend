const Joi = require('joi');

const { User } = require('../models/userModel');
const { CreationLike, validate } = require('../models/creationLikes');
const catchAsync = require('../utils/catchAsync');

exports.likeCreation = catchAsync(async (req, res, next) => {
	const { error } = validateLike(req.body);
	if (error) return next(new AppError(error.message, 400));

	const { creationId } = req.body;
	const user = await User.findOne({ where: { email: req.user.email } });

	const userLike = await CreationLike.create({
		creationId,
		userId: user.userId,
	});

	res.status(201).json({
		status: 'success',
		data: {
			userLike
		}
	});
});

exports.unLikeCreation = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	const { creationId, userId } = req.body;
	await CreationLike.destroy({ where: { userId, creationId }});

	res.status(204).json({
		status: 'success',
		data: null
	});
});

function validateLike(obj) {
	const schema = Joi.object({
		creationId: Joi.number().required()
	});

	return schema.validate(obj);
}
