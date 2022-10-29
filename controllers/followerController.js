const { Follower, validate } = require('../models/followerModel');
const { User } = require('../models/userModel');
const { Creation } = require('../models/creationModel');
const { CreationComment } = require('../models/creationComments');
const { CreationLike } = require('../models/creationLikes');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createFollower = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	const followedBy = await User.findOne({ where: { email: req.user.email }});

	const { userId } = req.body;
	if (userId === followedBy.userId) return next(new AppError('You can not follow your self'), 400);

	const resp = await Follower.create({
		userId,
		followById: followedBy.userId
	});

	res.status(201).json({
		status: 'success',
		data: {
			resp
		}
	});
});

exports.getFollowedByCreations = catchAsync(async (req, res, next) => {
	const { email } = req.user;
	const ids = await getFollowedUsersIds(email);

	const creations = await Creation.findAll(
		{ 
			include: [
				User, 
				{
					model: CreationComment,
					include: User
				},
				{
					model: CreationLike,
					attributes: ['userId', 'creationId']
				}
			],
			where: { userId: ids }
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			creations
		}
	});
});

exports.getAllFollowedByUsers = catchAsync(async (req, res, next) => {
	const { email } = req.user;
	const ids = await getFollowedUsersIds(email);

	res.status(200).json({
		status: 'success',
		data: ids
	});
});

async function getFollowedUsersIds(email) {
	const loggedInUser = await User.findOne({ where: { email }});

	const followers = await Follower.findAll({ 
		where: { followById: loggedInUser.userId },
		attributes: ['userId']
	});

	const followedUsersIds = followers.map(follower => follower.dataValues.userId);

	return followedUsersIds;
}