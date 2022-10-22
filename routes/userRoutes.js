const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(userController.getAllUsers)
	.post(auth, userController.createUser);

router.route('/:id')
	.get(userController.getUserById)
	.put(userController.updateUser)
	.delete(userController.deleteUser)

module.exports = router;