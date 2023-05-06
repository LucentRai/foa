const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Food must have a name'],
		unique: true,
		trim: true,
		maxlength: [40, 'Food name must be less than or equal to 40'],
		minlength: [2, 'Food name must be greater than or equal to 2']
	},
	price: {
		type: Number,
		required: [true, 'Food must have price'],
	},
	summary: {
		type: String,
		trim: true,
		maxlength: [200, 'Summary must not exceed 200 characters']
	},
	images: [{
		type: String,
		unique: true,
		required: [true, 'Pictures of food must be provided']
	}],
	ratingsAverage: {
		type: Number,
		default: 4
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	}
},
{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}	
});

module.exports = mongoose.model('Food', foodSchema);