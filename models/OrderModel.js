const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	customer:{
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required:[true, 'User Id must be provided']
	},
	food: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Food',
		required: [true, 'Food must be selected']
	},
	portion: {
		type: [Number],
		default: 1
	},
	quantity: {
		type: [Number],
		required: [true, 'Quantity of food must also be provided'],
		validate: {
			validator: function (q){
				return q.length === this.food.length;
			},
			message: 'Provide quantity for all foods'
		}
	}
});

module.exports = mongoose.model('Order', orderSchema);