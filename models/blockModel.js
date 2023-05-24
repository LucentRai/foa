const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Block name required'],
		trim: true,
		maxlength: [20, 'Block name must not exceed 20 characters']
	},
	workers: {
		type: [mongoose.Schema.ObjectId],
		ref: 'User',
		required: [true, 'At least one employee is required']
	},
	menu: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Food',
		required: [true, 'At least one food item should be provided']
	},
	ratingsAverage: {
		type: Number,
		default: 4
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	}
});

const BlockModel = mongoose.model('Block', blockSchema);

module.exports = BlockModel;