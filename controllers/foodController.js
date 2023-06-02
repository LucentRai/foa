const Food = require('../models/FoodModel');
const Canteen = require('../models/CanteenModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factoryFunc = require('./handlerFactory');

async function getCanteenMenu(req, res, next){
	const canteenId = await Canteen.findOne({slug: req.params.canteenSlug}).select('id');
	factoryFunc.getAll(Food, {canteen: canteenId})(req, res, next);
}

async function createMenu(req, res, next){
	if(req.userInfo.role === 'canteen'){
		req.body.canteen = req.userInfo.canteen;
	}
	factoryFunc.createOne(Food)(req, res, next);
}

async function updateMyMenu(req, res, next){
	
}

module.exports = {
	getAllMenu: factoryFunc.getAll(Food),
	getCanteenMenu,
	getFood: factoryFunc.getOne(Food),
	createMenu: catchAsync(createMenu),
	updateMyMenu: catchAsync(updateMyMenu),
	updateMenu: factoryFunc.updateOne(Food),
	deleteMenuItem: factoryFunc.deleteOne(Food)
};