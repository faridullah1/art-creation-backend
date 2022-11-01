const Joi = require('joi');

const { Creation, validate } = require('../models/creationModel');
const { CreationComment } = require('../models/creationComments');
const { CreationLike } = require('../models/creationLikes');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createPrediction = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

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
});

exports.getAllCreations = catchAsync(async (req, res, next) => {
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
			include: [
				{ model: User }, 
				{
					model: CreationComment,
					limit: 2,
					offset: 0,
					include: User
				},
				{ 
					model: CreationLike, 
					attributes: ['userId', 'creationId']
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
});

exports.getLoggedInUserCreations = catchAsync(async (req, res, next) => {
	const status = req.query.status;

	const page = parseInt(req.query.page || 1, 10);
	const limit = parseInt(req.query.limit || 10, 10);

	const offset = (page - 1) * limit;
	
	const where = {};
	if (status !== 'Default') where.status = status;

	const user = await User.findOne({ where: { email: req.user.email } });
	where.userId = user.userId;

	const { rows: creations, count: totalRecords } = await Creation.findAndCountAll({ where, offset, limit });

	res.status(200).json({
		status: 'success',
		totalRecords,
		data: {
			creations
		}
	});
});

exports.publishCreation = catchAsync(async (req, res, next) => {
	const { error } = validatePublishCreationCriteria(req.body);
	if (error) return next(new AppError(error.message, 400));

	const { creationId, title, description } = req.body;

	const creation = await Creation.findByPk(creationId);

	creation.status = 'Published';
	creation.prompt = title;
	creation.description = description;

	await creation.save();

	res.status(200).json({
		status: 'success',
		data: {
			creation
		}
	});
});

function validatePublishCreationCriteria(user) {
	const schema = Joi.object({
		creationId: Joi.number().required(),
		title: Joi.string().max(255).required(),
		description: Joi.string().max(255).allow(null)
	});

	return schema.validate(user);
}