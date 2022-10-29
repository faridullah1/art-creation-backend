const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const AppError = require('../utils/appError');

exports.auth = async (req, res, next) => {
	let token = '';

	if (req.header('Authorization')) {
		token = req.header('Authorization').split(' ')[1];
	}

	if (!token) return next(new AppError('Access denied. No token provided.'), 401);

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const payload = ticket.getPayload();
		req.user = payload;
		next();
	}
	catch(err) {
		return next(new AppError('Invalid Token.'), 400);
	}
}