const jwt = require('jsonwebtoken');
const {promisify} = require('util');
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
	let userDetail = {
		name: req.body.name,
		role: req.body.role,
		email: req.body.email,
		phoneNo: req.body.phoneNo,
		password: req.body.password
	};

	if(req.body.role === 'student'){
		if(!req.body.rollNo){
			return next(new AppError('Student must have roll number'));
		}
		userDetail.rollNo = req.body.rollNo;
	}

	const newUser = await User.create(userDetail);
	sendTokenResponse(newUser, 201, res);
}

async function protectRoute(req, res, next){
	let token;

	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(' ')[1];
	}

	if(!token){
		next(new AppError('Please login to view this page', 401));
	}
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // JWT Verification
	
	// if user is deleted after token is issued
	const userInfo = await User.findById(decoded.id);
	if(!userInfo){
		next(new AppError('User no longer exist', 401));
	}

	req.userInfo = userInfo;
	next();
}

function restrictTo(...roles){
	return (req, res, next) => {
		if(!roles.includes(req.userInfo.role)){
			return next(new AppError('You are not authorized to do this operation', 403));
		}
		next();
	};
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
	protectRoute: catchAsync(protectRoute),
	restrictTo
};