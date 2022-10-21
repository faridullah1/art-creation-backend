const express = require('express');
const router = express.Router();
const creationController = require('../controllers/creationController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(auth, creationController.getAllCreations)
	.post(creationController.createPrediction)

router.route('/users/:id').get(creationController.getPredictionsByUserId);

// router.route('/:id')
// 	.get(creationController.getUserById)
// 	.put(creationController.updateUser)
// 	.delete(creationController.deleteUser)

module.exports = router;