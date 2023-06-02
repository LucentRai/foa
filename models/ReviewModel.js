const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Review should belong to a user']
	},
	food: {
		type: mongoose.Schema.ObjectId,
		ref: 'Food'
	},
	canteen: {
		type: mongoose.Schema.ObjectId,
		ref: 'Canteen'
	},
	review: {
		type: String,
		required: [true, 'Review must have description'],
		trim: true,
		minlength: [10, 'Review should be at least 10 characters long'],
		maxlength: [500, 'Review can have at most 500 characters long']
	},
	rating: {
		type: Number,
		default: 3.5
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false
	}
});

// MIDDLEWARES
reviewSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});
reviewSchema.pre('save', function(next){
	if(this.food && this.branch){
		next(new AppError('Cannot add review of food and block at the same time', 400));
	}
	next();
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;