const jwt = require('jsonwebtoken');

exports.admin = (req, res, next) => {
	let token = '';

	if (req.header('Authorization')) {
		token = req.header('Authorization').split(' ')[1];
	}

	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		if (!decodedToken) return res.status(401).send('Invalid token.');
		
		req.user = decodedToken;
		next();
	}
	catch(err) {
		res.status(400).send('Invalid Token.');
	}
};