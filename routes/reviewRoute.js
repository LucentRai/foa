const express = require('express');
const reviewController = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post('/', reviewController.createReview);

reviewRouter.route(':/id')
	.get(reviewController.getReview)
	.update(reviewController.updateReview)
	.delete(reviewController.deleteReview);