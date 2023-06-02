const mongoose = require('mongoose');

const canteenSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: [true, 'Branch name must be unique'],
		required: [true, 'Branch name required'],
		trim: true,
		maxlength: [20, 'Branch name must not exceed 20 characters']
	},
	workers: {
		type: [mongoose.Schema.ObjectId],
		ref: 'User'
	},
	ratingsAverage: {
		type: Number,
		default: 4
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	address: {
		type: String,
		trim: true,
		required: [true, 'Branch must have adddress'],
		maxlength: [100, 'Branch location cannot exceed 100 characters']
	},
	slug: String
});



/****************************** MIDDLEWARES ******************************/
canteenSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});

const CanteenModel = mongoose.model('Canteen', canteenSchema);
module.exports = CanteenModel;