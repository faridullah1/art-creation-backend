const predictions = [
	{
		createdAt: new Date(),
		input: {
			text: 'beautiful village'
		},
		output: ["/assets/images/village.webp"]
	},
	{
		createdAt: new Date(),
		input: {
			text: 'Moai statue giving a TED talk'
		},
		output: ["/assets/images/moai.webp"]
	}
];

exports.getAllPredictions = (req, res) => {
	res.status(200).json({
		data: predictions
	});
}

exports.getAllPredictionsDB = async (req, res) => {
	try {
		const resp = await superAgent
		.get('https://api.replicate.com/v1/predictions')
		.set('Authorization', `Token ${process.env.REPLICATE_API_TOKEN}`);
	
		res.status(200).send(resp.body);
	}
	catch(err) {
		res.status(err.status).send(err);
	}
}

exports.getPredictionDB = async (req, res) => {
	try {
		const predictionId = req.params.id;

		const resp = await superAgent
			.get('https://api.replicate.com/v1/predictions/' + predictionId)
			.set('Authorization', `Token ${process.env.REPLICATE_API_TOKEN}`);
		
		res.status(200).send(resp.body);
	}
	catch(err) {
		res.status(err.status).send(err);
	}
}

exports.createPrediction = async (req, res) => {
	const input = req.body.input;

	try {
		const resp = await superAgent
		.post('https://api.replicate.com/v1/predictions')
		.send({ version: process.env.REPLICATE_API_VERSION, input })
		.set('Authorization', `Token ${process.env.REPLICATE_API_TOKEN}`);
	
		res.status(200).send(resp.body);
	}
	catch(err) {
		res.status(err.status).send(err);
	}
}