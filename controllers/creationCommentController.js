const User = require('../models/userModel');
const CreationComment = require('../models/creationComments');

exports.createComment = async (req, res, next) => {
	try {
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
	} catch(err) {
		res.status(500).send(err);
	}
};
