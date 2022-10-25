const Follower = require('../models/followerModel');
const User = require('../models/userModel');
const Creation = require('../models/creationModel');
const CreationComment = require('../models/creationComments');

exports.createFollower = async (req, res, next) => {
	try {
		const followedBy = await User.findOne({ where: { email: req.user.email }});

		const { userId } = req.body;

		if (userId === followedBy.userId) {
			return res.status(400).json({
				status: 'error',
				message: 'You can not follow your self'
			});
		}

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
	} catch(err) {
		res.status(500).send(err.message);
	}
};

exports.getFollowedByCreations = async (req, res, next) => {
	try {
		const { email } = req.user;
		const ids = await getFollowedUsersIds(email);

		const creations = await Creation.findAll(
			{ 
				include: [User, {
						model: CreationComment,
						include: User
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
	} catch(err) {
		res.status(500).send(err.message);
	}
};

exports.getAllFollowedByUsers = async (req, res, next) => {
	try {
		const { email } = req.user;
		const ids = await getFollowedUsersIds(email);

		res.status(200).json({
			status: 'success',
			data: ids
		});
	} catch(err) {
		res.status(500).send(err.message);
	}
};

async function getFollowedUsersIds(email) {
	const loggedInUser = await User.findOne({ where: { email }});

	const followers = await Follower.findAll({ 
		where: { followById: loggedInUser.userId },
		attributes: ['userId']
	});

	const followedUsersIds = followers.map(follower => follower.dataValues.userId);

	return followedUsersIds;
}