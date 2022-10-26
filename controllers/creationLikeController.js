const User = require('../models/userModel');
const CreationLike = require('../models/creationLikes');

exports.likeCreation = async (req, res, next) => {
	try {
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
	} catch(err) {
		res.status(500).send(err);
	}
};

exports.unLikeCreation = async (req, res, next) => {
	try {
		const { creationId, userId } = req.body;
		await CreationLike.destroy({ where: { userId, creationId }});

		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch(err) {
		res.status(500).send(err.message);
	}
};
