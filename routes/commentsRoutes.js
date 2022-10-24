const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/creationCommentController');
const { auth } = require('../middleware/auth');

router.route('/')
	.post(auth, commentsController.createComment)

module.exports = router;