const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

async function getOrder(req, res, next){
	let order;

	if(req.userInfo.role === 'student' || req.userInfo.role === 'customer'){
		order = await Order.find({customer: req.userInfo.id});
	}

	if(req.params.id){
		if(req.userInfo.role === 'admin'){
			order = await Order.find({customer: req.params.id});
		}
		else if(req.userInfo.role === 'cafeteria'){
			order = await Order.find({
				customer: req.params.id,
				food: {block: req.userInfo.block} // ordered food should be in that cafeteria
			});
		}
	}
	else { 
		if(req.userInfo.role === 'admin'){
			factoryFunc.getAll(Order)(req, res, next);
			return;
		}
		else if(req.userInfo.role === 'cafeteria'){ // all orders with foods availabe at specific cafeteria
			order = await Order.find({food: {block: req.userInfo.block}});
		}
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
	getOrder: catchAsync(getOrder),
	orderFood: catchAsync(orderFood),
	createOrder: factoryFunc.createOne(Order),
	updateOrder: factoryFunc.updateOne(Order),
	deleteOrder: factoryFunc.deleteOne(Order)
};