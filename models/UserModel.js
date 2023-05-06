const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "User must have name"],
		trim: true,
		maxlength: [30, 'Name must not exceed 30 characters'],
		minlength: [3, 'Name must have more than 2 characters']
	},
	role: {
		type: String,
		default: 'student',
		enum: ['admin', 'student', 'customer']
	},
	email: {
		type: String,
		required: [true, 'User email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide valid email']
	},
	rollNo: {
		type: Number
	},
	password: {
		type: String,
		required: [true, 'Password must be set'],
		minlength: [8, 'Password must be at least 8 characters long'],
		select: false
	}
});

module.exports = mongoose.model('User', userSchema);