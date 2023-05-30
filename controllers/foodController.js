const Food = require('../models/FoodModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factoryFunc = require('./handlerFactory');

async function createMenu(req, res, next){
	
}

module.exports = {
	getMenu: factoryFunc.getAll(Food),
	getFood: factoryFunc.getOne(Food),
	createMenu: catchAsync(createMenu),
	updateMenu: factoryFunc.updateOne(Food),
	deleteFood: factoryFunc.deleteOne(Food)
};