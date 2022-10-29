const { User } = require('../models/userModel');
const { CreationComment, validate } = require('../models/creationComments');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createComment = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	const { comment, creationId } = req.body;

	const user = await User.findOne({ where: { email: req.user.email } });

	const resp = await CreationComment.create({
		comment,
		creationId,
		userId: user.userId,
	});

	const data = { ...resp['dataValues'], user };

	res.status(201).json({
		status: 'success',
		data: data
	});
});
