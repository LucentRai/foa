const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

async function getOrder(req, res, next){
	const order = await Order.findById(req.params.id);

	if(userInfo.role === 'admin' || userInfo.role === 'cafeteria'){
		res.status(200)
			.json({
				status: 'success',
				data: {
					order
				}
			});
	}

	if(userInfo.id !== order.user){
		return next(new AppError('You are not authorized to access this order.', 401));
	}

	res.status(200)
		.json({
			status: 'success',
			data: {
				order
			}
		});
}

async function orderFood(req, res, next){
	const userOrder = {
		...req.body,
		customer: req.userInfo.id
	};

	const order = await Order.create(userOrder);
	res.status(200)
		.json({
			status: 'success',
			data: order
		});
}

module.exports = {
	getAllOrders: factoryFunc.getAll(Order),
	getOrder: catchAsync(getOrder),
	orderFood: catchAsync(orderFood),
	createOrder: factoryFunc.createOne(Order),
	updateOrder: factoryFunc.updateOne(Order),
	deleteOrder: factoryFunc.deleteOne(Order)
};