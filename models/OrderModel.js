const mongoose = require('mongoose');

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
		default: 1
	},
	quantity: {
		type: [Number],
		required: [true, 'Quantity of food must also be provided'],
		validate: {
			validator: function (q){
				return q.length === this.foods.length;
			},
			message: 'Provide quantity for all foods'
		}
	},
	branch: {
		type: String,
		required: [true, 'Ordered food must belong to a specific branch']
	}
});

// MIDDLEWARES
orderSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;