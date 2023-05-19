const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
// const catchAsync = require('../utils/catchAsync');

const roles = ['admin', 'student', 'customer', 'cafeteria'];
const blocks = ['A', 'B', 'C'];

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
		enum: roles,
		default: 'student'
	},
	email: {
		type: String,
		required: [true, 'User email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide valid email']
	},
	rollNo: {
		type: Number,
		validate: {
			validator: function(r) {
				return this.role === 'student' ? true : false;
			},
			message: 'Only student can have roll number'
		}
	},
	password: {
		type: String,
		required: [true, 'Password must be set'],
		minlength: [8, 'Password must be at least 8 characters long'],
		select: false
	},
	block: {
		type: String,
		enum: blocks,
		default: 'A'
	}
});

// MIDDLEWARES
userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next();
	}
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// STATIC INSTANCE METHODS
userSchema.methods.doesPasswordMatch = async function (inputPassword, actualPassword){
	return await bcrypt.compare(inputPassword, actualPassword);
};

const User = mongoose.model('User', userSchema);
User.roles = [...roles];

module.exports = User;