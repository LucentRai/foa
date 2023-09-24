const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/UserModel');
const factoryFunc = require('./handlerFactory');

async function getMyProfile(req, res, next){
	res.status(200)
		.json({
			status: 'success',
			data: req.userInfo
		})
}

async function updateMe(req, res, next){
	if(req.body.password){
		return new AppError(`To update password, use /updatePassword path`, 400);
	}
}

module.exports = {
	getMyProfile,
	getUser: factoryFunc.getOne(User),
	getAllUsers: factoryFunc.getAll(User),
	createUser: factoryFunc.createOne(User),
	updateMe: catchAsync(updateMe),
	updateUser: factoryFunc.updateOne(User),
	deleteUser: factoryFunc.deleteOne(User)
};