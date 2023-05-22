const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

async function getMyOrder(req, res, next){
	const order = await Order.find({customer: req.userInfo.id}).select('-__v -customer');
	if(!order){
		return next(new AppError('No order placed', 404));
	}
	res.status(200)
		.json({
			status: 'success',
			data: {order}
		});
}

async function getAllOrders(req, res, next){
	if(req.userInfo.role === 'admin'){
		factoryFunc.getAll(Order)(req, res, next);
		return;
	}
	else if(req.userInfo.role === 'cafeteria'){ // all orders with foods availabe at specific cafeteria
		order = await Order.find({food: {$match: {block: req.userInfo.block}}}).select('-__v');
	}
}

async function getOrder(req, res, next){
	let order;

	if(req.userInfo.role === 'admin'){
		order = await Order.find({customer: req.params.id}).select('-__v');
	}
	else if(req.userInfo.role === 'cafeteria'){
		order = await Order.find({
			customer: req.params.id,
			food: {block: req.userInfo.block} // ordered food should be in that cafeteria
		})
		.select('-__v');
	}

	if(!order){
		return next(new AppError(`No order with id ${req.params.id} found`, 404));
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

async function updateMyOrder(req, res, next){
	
}

module.exports = {
	getOrder: catchAsync(getOrder),
	getMyOrder: catchAsync(getMyOrder),
	getAllOrders: catchAsync(getAllOrders),
	orderFood: catchAsync(orderFood),
	createOrder: factoryFunc.createOne(Order),
	updateOrder: factoryFunc.updateOne(Order),
	updateMyOrder,
	deleteOrder: factoryFunc.deleteOne(Order)
};