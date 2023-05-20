const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AppError = require('../utils/AppError');
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
	phoneNo: {
		type: Number,
		maxlength: [10, 'Phone number must not exceed 10 digits']
	},
	rollNo: {
		type: Number,
		validate: {
			validator: async function (roll){
				console.log('here');
				if(roll === null || roll === undefined){
					return true;
				}
				const userCount = await mongoose.models.User.countDocuments({rollNo: roll});
				return userCount === 0;
			}
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

// async function validateRollNo(roll){
// 	if(this.role === 'student'){
// 		console.log(this.rollNo);
// 		if(!this.rollNo){
// 			next(new AppError('Provide a valid roll no for student'));
// 			return false;
// 		}
// 		const userCount = await mongoose.models.User.countDocuments({rollNo: roll});
// 		if(userCount){
// 			next(new AppError(`There is already student with ${this.rollNo}`));
// 			return false;
// 		}
// 	}
// 	return true;
// }
// async function validateRollNo(roll){
// 	console.log('here');
// 	if(roll === null || roll === undefined){
// 		return true;
// 	}

// 	const userCount = await mongoose.models.User.countDocuments({rollNo: roll});
// 	return userCount === 0;
// }