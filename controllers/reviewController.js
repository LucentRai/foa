const Review = require('../models/ReviewModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factoryFunc = require('./handlerFactory');

async function createReview(req, res, next){
	if(!req.body.food && !req.body.canteen){
		return next('Cannot add review of both food and canteen at the same time', 400);
	}
	req.body.user = req.userInfo.id;
	factoryFunc.createOne(Review)(req, res, next);
}

async function updateReview(req, res, next){
	const review = await Review.findById(req.params.id);
	if(!review){
		return next(new AppError(`No review with id ${req.params.id} found`, 404));
	}
	if(review.user.toString() !== req.userInfo._id.toString()){
		return next(new AppError('You are not authorized to do this operation', 403));
	}
	factoryFunc.updateOne(Review)(req, res, next);
}

async function deleteReview(req, res, next){
	const review = await Review.findById(req.params.id);
	if(req.userInfo.role === 'student' || req.userInfo.role === 'customer'){
		if(review.user.toString() !== req.userInfo._id.toString()){
			return next(new AppError('You are not authorized to do this operation', 403));
		}
	}
	factoryFunc.deleteOne(Review)(req, res, next);
}

module.exports = {
	createReview: catchAsync(createReview),
	getAllReview: factoryFunc.getAll(Review),
	getReview: factoryFunc.getOne(Review),
	updateReview: catchAsync(updateReview),
	deleteReview: catchAsync(deleteReview)
};