const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const orderSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required:[true, 'User Id must be provided']
	},
	foods: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Food',
		required: [true, 'Food must be selected']
	},
	portion: {
		type: [Number],
		required: [true, 'Food portion must also be provided'],
		validate: {
			validator: function (p){
				return p.length === this.foods.length;
			},
			message: 'Provide portions data for all foods'
		}
	},
	quantity: {
		type: [Number],
		required: [true, 'Quantity of food must also be provided'],
		validate: {
			validator: function (q){
				return q.length === this.foods.length; // this does not work when updating with findByIdAndUpdate()
			},
			message: 'Provide quantity for all foods'
		}
	},
	canteen: {
		type: mongoose.Schema.ObjectId,
		ref: 'Canteen'
	}
});


/****************************** MIDDLEWARES ******************************/
orderSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;