const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followerController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.route('/')
	.get(followerController.getAllFollowedByUsers)
	.post(followerController.createFollower)

router.route('/creations').get(followerController.getFollowedByCreations);

module.exports = router;