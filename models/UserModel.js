const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');

const roles = ['admin', 'student', 'customer', 'canteen'];

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
	phoneNo: {
		type: Number,
		maxlength: [10, 'Phone number must not exceed 10 digits']
	},
	rollNo: {
		type: Number,
		validate: uniqueRollCheck // 'unique' property is not used because we want to send custom message to user and also save null value for users with other roles
	},
	password: {
		type: String,
		required: [true, 'Password must be set'],
		minlength: [8, 'Password must be at least 8 characters long'],
		select: false
	},
	canteen: {
		type: mongoose.Schema.ObjectId,
		ref: 'Canteen'
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});

// MIDDLEWARES
userSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});
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

userSchema.methods.createResetPasswordToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes after

	return resetToken;
}


async function uniqueRollCheck(roll){
	if(!roll){
		return true;
	}
	const userCount = await mongoose.models.User.countDocuments({rollNo: roll});
	if(userCount){
		throw new AppError(`There is already student with roll number ${this.rollNo}`);
	}
	return true;
}


const User = mongoose.model('User', userSchema);
User.roles = [...roles];
module.exports = User;