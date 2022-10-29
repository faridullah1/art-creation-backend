const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');

router.route('/me').get(auth, userController.me);

router.route('/')
	.get(admin, userController.getAllUsers)
	.post(auth, userController.createUser);

router.route('/:id')
	.delete(admin, userController.deleteUser)

module.exports = router;