const Branch = require('../models/BranchModel');
const factoryFunc = require('../controllers/handlerFactory');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

async function updateMyBranch(req, res, next){
	req.params.id = req.userInfo.branch;
	factoryFunc.updateOne(Branch)(req, res, next);
}

async function getBranch(req, res, next){
	factoryFunc.get(Branch, {name: req.params.branchName})(req, res, next);
}

module.exports = {
	getBranch,
	getAllBranches: factoryFunc.getAll(Branch),
	createBranch: factoryFunc.createOne(Branch),
	updateBranch: factoryFunc.updateOne(Branch),
	updateMyBranch: catchAsync(updateMyBranch),
	deleteBranch: factoryFunc.deleteOne(Branch)
};