const Follower = require('../models/followerModel');
const User = require('../models/userModel');
const Creation = require('../models/creationModel');
const CreationComment = require('../models/creationComments');

exports.createFollower = async (req, res, next) => {
	try {
		const followedBy = await User.findOne({ where: { email: req.user.email }});

		const { userId } = req.body;

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
		const loggedInUser = await User.findOne({ where: { email: req.user.email }});

		const followers = await Follower.findAll({ 
			where: { followById: loggedInUser.userId },
			attributes: ['userId']
		});

		const followedUsersIds = followers.map(follower => follower.dataValues.userId)

		const creations = await Creation.findAll(
			{ 
				include: [User, {
						model: CreationComment,
						include: User
					}
				],
				where: { userId: followedUsersIds }
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
