const User = require('../models/userModel');
const db = require('../db');

exports.createUser = async (req, res, next) => {
	const { email, name } = req.user;
	const user = await User.findOne({ where: { email }});
	if (user) {
		return res.status('403').json({
			status: 'error',
			message: 'User already exists'	
		});
	}

	const resp = await User.create({
		email, name
	});

	res.status(201).json({
		status: 'success',
		data: {
			user: resp
		}
	});
};

exports.getAllUsers = async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		data: {
			users
		}
	});
};

exports.getUserById = async (req, res, next) => {
	const userId = req.params.id;
	const user = await User.findByPk(userId);

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
};

exports.updateUser = async (req, res, next) => {
	const userId = req.params.id;
	const user = await User.findByPk(userId);

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'No record found with given Id'
		});
	}

	const { email, name } = req.body;

	user.name = name;
	user.email = email;

	const updatedUser = await user.save();

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser
		}
	});
};

exports.deleteUser = async (req, res, next) => {
	const userId = req.params.id;
	const user = await User.destroy({ where: { userId }});

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'No record found with given Id'
		});
	}

	res.status(204).json({
		status: 'success',
		data: {
			user
		}
	});
};