const mongoose = require('mongoose');

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
		enum: ['admin', 'student', 'staff', 'customer']
	},
	rollNo: {
		type: Number,
		unique: true
	}
});

module.exports = mongoose.model('User', userSchema);