const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', authController.login);
userRouter.post('/signup', authController.signup);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// PROTECTED ROUTES
userRouter.use(authController.protectRoute);
userRouter.get('/my-profile', userController.getMyProfile);

// ONLY FOR ADMINS
userRouter.use(authController.restrictTo('admin'));

userRouter.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

userRouter.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = userRouter;
