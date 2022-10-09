const path = require('path');

const superAgent = require('superagent');
const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

const predictionRouter = require('./routes/predictionRoutes');

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
// app.use(express.static(__dirname + '/dist/replicate-api-demo'));

app.use('/v1/predictions', predictionRouter);

// app.get('/*', (req, res) => {    
// 	res.sendFile(path.join(__dirname+'/dist/replicate-api-demo/index.html'));
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});