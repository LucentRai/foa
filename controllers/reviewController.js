const Review = require('../models/ReviewModel');
const AppError = require('../controllers/errorController');
const catchAsync = require('../utils/catchAsync');
const factoryFunc = require('./handlerFactory');

async function createReview(req, res, next){
	if(!req.body.food && !req.body.canteen){
		return next('Cannot add review of both food and canteen at the same time', 400);
	}
	req.body.user = req.userInfo.id;
	factoryFunc.createOne(Review)(req, res, next);
}

module.exports = {
	createReview: catchAsync(createReview),
	getAllReview: factoryFunc.getAll(Review),
	getReview: factoryFunc.getOne(Review),
	updateReview: factoryFunc.updateOne(Review),
	deleteReview: factoryFunc.deleteOne(Review)
}