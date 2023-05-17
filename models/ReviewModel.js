const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	food: {
		type: mongoose.Schema.ObjectId,
		ref: 'Food',
		required: [true, 'Review should belong to a Food item']
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Review should belong to a user']
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
},
{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;