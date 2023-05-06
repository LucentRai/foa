const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
	.get(userController.getAllUsers)
	.post(userController.signup)

module.exports = router;