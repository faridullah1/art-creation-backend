const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { AdminUser } = require('../models/adminUserModel');

exports.login = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	let user = await AdminUser.findOne({ where: { email: req.body.email } });
	if (!user) return res.status(400).send('Invalid email or password.');

	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(400).send('Invalid email or password.');

	const token = generateAuthToken(user);

	res.status(200).send({
		status: 'success',
		access_token: token,
		user
	});
}

exports.signUp = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const { name, email, password } = req.body;

	let user = await AdminUser.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	const admin = await AdminUser.create({
		name, email, password
	});

	const salt = await bcrypt.genSalt(10);
	admin.password = await bcrypt.hash(admin.password, salt);

	await admin.save();

	const token = generateAuthToken(admin);

	res.setHeader('x-auth-token', token);
	res.setHeader('access-control-expose-headers', 'x-auth-token');

	res.status(201).send({
		status: 'success',
		data: {
			name: admin.name,
			email: admin.email
		}
	});
}


function generateAuthToken(user) {
	return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: process.env.JWT_EXPIRY
	});
}

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email().min(3).max(255).required(),
		password: Joi.string().min(10).required()
	});

	return schema.validate(req); 
}