const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const reviewRouter = express.Router({mergeParams: true});

reviewRouter.use(authController.protectRoute);

reviewRouter.route('/')
	.get(reviewController.getAllReview)
	.post(authController.restrictTo('admin', 'student', 'customer'), reviewController.createReview);

reviewRouter.route(':/id')
	.patch(authController.restrictTo('admin', 'student', 'customer'), reviewController.updateReview)
	.delete(authController.restrictTo('admin', 'student', 'customer'), reviewController.deleteReview);

module.exports = reviewRouter;