const Food = require('../models/FoodModel');
const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');
const factoryFunc = require('./handlerFactory');



module.exports = {
	getAllFoods: factoryFunc.getAll(Food),
	getFood: factoryFunc.getOne(Food),
	createFood: factoryFunc.createOne(Food),
	updateFood: factoryFunc.updateOne(Food),
	deleteFood: factoryFunc.deleteOne(Food)
};