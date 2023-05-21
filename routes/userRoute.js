const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', authController.login);
userRouter.post('/signup', authController.signup);

userRouter.use(authController.protectRoute, authController.restrictTo('admin'));
userRouter.route('/')
	.post(userController.createUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = userRouter;