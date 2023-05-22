const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', authController.login);
userRouter.post('/signup', authController.signup);

// PROTECTED ROUTES
userRouter.use(authController.protectRoute);
userRouter.get('/my-profile', userController.getMyProfile);

userRouter.use(authController.restrictTo('admin'));
userRouter.route('/')
	.get(userController.getUser)
	.post(userController.createUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = userRouter;