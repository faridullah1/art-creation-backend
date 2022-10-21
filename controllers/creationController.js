const superAgent = require('superagent');
const Creation = require('../models/creationModel');
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

		const resp = await Creation.create({
			prompt,
			modelType,
			outputImage: pictures[Math.floor(Math.random() * pictures.length)],
			userId: 2
		});

		res.status(201).json({
			status: 'success',
			data: {
				resp
			}
		});
	} catch(err) {
		res.status(err.status).send(err);
	}
};

exports.getAllCreations = async (req, res, next) => {
	try {
		const creations = await Creation.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				creations
			}
		});
	}
	catch(error) {
		res.status(error.status).send({
			status: 'fail',
			message: error.message
		});
	}
};

exports.getPredictionsByUserId = async (req, res, next) => {
	const userId = +req.params.id;
	console.log('User id =', userId)
	const predictions = await Creation.findAll({ where: { userId }});

	res.status(200).json({
		status: 'success',
		data: {
			predictions
		}
	});
};