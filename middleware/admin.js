const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.admin = (req, res, next) => {
	let token = '';

	if (req.header('Authorization')) {
		token = req.header('Authorization').split(' ')[1];
	}

	if (!token) return next(new AppError('Access denied. No token provided.'), 401);

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		if (!decodedToken) return res.status(401).send('Invalid token.');
		
		req.user = decodedToken;
		next();
	}
	catch(err) {
		return next(new AppError('Invalid Token.'), 400);
	}
};