const Review = require('../models/ReviewModel');
const AppError = require('../utils/AppError');
const factoryFunc = require('./handlerFactory');

module.exports = {
	getReview: factoryFunc.getOne(Review),
	updateReview: factoryFunc.updateOne(Review),
	deleteReview: factoryFunc.deleteOne(Review)
}