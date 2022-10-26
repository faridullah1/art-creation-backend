const express = require('express');
const router = express.Router();
const likesController = require('../controllers/creationLikeController');
const { auth } = require('../middleware/auth');

router.route('/')
	.post(auth, likesController.likeCreation)
	.delete(auth, likesController.unLikeCreation);

module.exports = router;