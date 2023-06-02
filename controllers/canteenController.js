const Canteen = require('../models/CanteenModel');
const factoryFunc = require('./handlerFactory');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

async function updateMyBranch(req, res, next){
	req.params.id = req.userInfo.branch;
	factoryFunc.updateOne(Canteen)(req, res, next);
}

async function getBranch(req, res, next){
	factoryFunc.get(Canteen, {name: req.params.branchName})(req, res, next);
}

module.exports = {
	getBranch,
	getAllBranches: factoryFunc.getAll(Canteen),
	createBranch: factoryFunc.createOne(Canteen),
	updateBranch: factoryFunc.updateOne(Canteen),
	updateMyBranch: catchAsync(updateMyBranch),
	deleteBranch: factoryFunc.deleteOne(Canteen)
};