const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

async function login(req, res, next){
	const {email, password} = req.body;
	if(!email || !password){
		return next(new AppError('Both email and password required.', 400));
	}
	const user = await User.findOne({email}).select('+password'); // explicitly mentioning to select password
	if(!user || !(await user.doesPasswordMatch(password, user.password))){
		return next(new AppError('Email or password does not match', 401));
	}
	sendTokenResponse(user, 200, res);
}

async function signup(req, res, next){
	if(!(req.body.role === 'student') && !(req.body.role === 'customer')){ // values other than student or customer will not pass
		return next(new AppError('Cannot create this user role from this route. Contact Admin', 400));
	}
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role
	});
	sendTokenResponse(newUser, 201, res);
}

function generateToken(id){
	return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

function sendTokenResponse(user, statusCode, res){
	const token = generateToken(user);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_EXPIRATION_JS * 24 * 60 * 60 * 1000),
		HTTPOnly: true // cookie cannot be accessed or modified by browser
	};
	if(process.env.NODE_ENV === 'production'){
		cookieOptions.secure = true; // send cookie only on HTTPS
	}
	user.password = undefined; // remove password fields if selected
	res.cookie('jwt', token, cookieOptions);
	res.status(statusCode)
		.json({
			status: 'success',
			token,
			data: {user}
		});
}

module.exports = {
	login: catchAsync(login),
	signup: catchAsync(signup),
};