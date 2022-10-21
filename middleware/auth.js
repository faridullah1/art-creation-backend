const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.auth = async (req, res, next) => {
	let token = '';

	if (req.header('Authorization')) {
		token = header.split(' ')[1];
	}

	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const payload = ticket.getPayload();
		req.user = payload.email;
		next();
	}
	catch(err) {
		console.log("Error inside auth =", err);
		return res.status(400).send('Invalid Token.');
	}
}