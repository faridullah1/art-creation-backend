const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

router.route('/').get(predictionController.getAllPredictions);

module.exports = router;