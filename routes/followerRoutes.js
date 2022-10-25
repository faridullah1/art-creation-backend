const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followerController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(auth, followerController.getFollowedByCreations)
	.post(auth, followerController.createFollower)

module.exports = router;