// const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

module.exports = {
	getAllOrders: factoryFunc.getAll(Order),
	getOrder: factoryFunc.getOne(Order),
	createOrder: factoryFunc.createOne(Order),
	updateOrder: factoryFunc.updateOne(Order),
	deleteOrder: factoryFunc.deleteOne(Order)
};