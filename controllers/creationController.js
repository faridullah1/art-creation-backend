const superAgent = require('superagent');
const Creation = require('../models/creationModel');
const CreationComment = require('../models/creationComments');
const User = require('../models/userModel');
const db = require('../db');

exports.createPrediction = async (req, res, next) => {
	try {
		const { prompt, modelType } = req.body;

		pictures = [
			"https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_960_720.jpg", 
			"https://media.istockphoto.com/photos/hands-of-business-person-working-on-computer-picture-id879813798?s=612x612",
			"https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_960_720.jpg",
			"https://media.istockphoto.com/photos/human-resource-manager-checks-the-cv-online-to-choose-the-perfect-picture-id1352650187?s=612x612",
			"https://media.istockphoto.com/photos/abstract-data-background-picture-id1254825733?s=612x612"
		];

		// const resp = await superAgent.post(`http://models.talkart.io/${modelType}/`).send(
		// 	{
		// 		input: {
		// 			prompts: prompt
		// 		}
		// 	}
		// );

		const loggedInUser = await User.findOne({ where: { email: req.user.email }});

		if (!loggedInUser) {
			return res.status(401).json({
				status: 'error',
				message: 'No user one with given token'
			});
		}

		const resp = await Creation.create({
			prompt,
			modelType,
			outputImage: pictures[Math.floor(Math.random() * pictures.length)],
			userId: loggedInUser.userId
		});

		res.status(201).json({
			status: 'success',
			data: {
				resp
			}
		});
	} catch(err) {
		res.status(500).send(err);
	}
};

exports.getAllCreations = async (req, res, next) => {
	try 
	{
		const status = req.query.status;
		const where = {};
		if (status !== 'Default') where.status = status;

		/* 
			Get Creations with comments and user info
			resp = [
				{
					...creationinfo
					creation_comments: [
						{ 
							...commentInfo
							user: { ...userInfo }
						}
					]
					user: { ...userInfo }
				}
			]
		*/
		const creations = await Creation.findAll(
			{ 
				include: [User, {
						model: CreationComment,
						include: User
					}
				]
			}
		);

		res.status(200).json({
			status: 'success',
			data: {
				creations
			}
		});
	}
	catch(error) {
		res.status(500).send({
			status: 'fail',
			message: error.message
		});
	}
};

exports.getLoggedInUserCreations = async (req, res, next) => {
	const status = req.query.status;
	
	const where = {};
	if (status !== 'Default') where.status = status;

	const user = await User.findOne({ where: { email: req.user.email } });
	where.userId = user.userId

	const creations = await Creation.findAll({ where });

	res.status(200).json({
		status: 'success',
		data: {
			creations
		}
	});
};

exports.publishCreation = async (req, res, next) => {
	const { creationId, title, description } = req.body;

	const creation = await Creation.findByPk(creationId);

	creation.status = 'Published';
	creation.prompt = title;
	creation.description = description;

	creation.save();

	res.status(200).json({
		status: 'success',
		data: {
			creation
		}
	});
}