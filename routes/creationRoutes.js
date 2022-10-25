const express = require('express');
const router = express.Router();
const creationController = require('../controllers/creationController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.route('/')
	.get(creationController.getAllCreations)
	.post(creationController.createPrediction)

router.route('/mine').get(creationController.getLoggedInUserCreations);
router.route('/publish').post(creationController.publishCreation)

module.exports = router;