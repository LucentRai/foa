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
	req.params.id = req.body.id;
	const food = await Food.findById(req.body.id);
	console.log(food.canteen, req.userInfo.canteen);
	
	if(food.canteen.toString() !== req.userInfo.canteen.toString()){
		return next(new AppError('You are not authorized to do this operation', 403));
	}
	factoryFunc.updateOne(Food)(req, res, next);
}

async function deleteMyMenu(req, res, next){
	const food = await Food.findById(req.params.id);

	if(food.canteen.toString() !== req.userInfo.canteen.toString()){
		return next(new AppError('You are not authorized to do this operation', 403));
	}
	factoryFunc.deleteOne(Food)(req, res, next);
}

module.exports = {
	getAllMenu: factoryFunc.getAll(Food),
	getCanteenMenu,
	getFood: factoryFunc.getOne(Food),
	createMenu: catchAsync(createMenu),
	updateMenu: factoryFunc.updateOne(Food),
	updateMyMenu: catchAsync(updateMyMenu),
	deleteMenuItem: factoryFunc.deleteOne(Food),
	deleteMyMenu: catchAsync(deleteMyMenu)
};