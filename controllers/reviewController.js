const Review = require('../models/ReviewModel');
const factoryFunc = require('./handlerFactory');

module.exports = {
	createReview: factoryFunc.createOne(Review),
	getReview: factoryFunc.getOne(Review),
	updateReview: factoryFunc.updateOne(Review),
	deleteReview: factoryFunc.deleteOne(Review)
}