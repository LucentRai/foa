const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

async function getMyOrder(req, res, next){
	const order = await Order.find({customer: req.userInfo.id}).select('-customer');
	respondToOrder(order, req.params.id, res, next);
}

async function getAllOrders(req, res, next){
	let order;

	if(req.userInfo.role === 'admin'){
		order = await Order.find()
			.populate('customer');
	}
	else if(req.userInfo.role === 'cafeteria'){ // all orders with foods availabe at specific cafeteria
		order = await Order.find({branch: req.userInfo.branch})
			.populate({
					path: 'customer',
					select: 'name rollNo'
			})
			.populate({
				path: 'foods',
				select: '-branch -id'
			})
			.select('-branch');
	}
	respondToOrder(order, req.params.id, res, next);
}

async function getOrder(req, res, next){
	let order;

	if(req.userInfo.role === 'admin'){
		order = await Order.find({customer: req.params.id})
			.populate('foods');
	}
	else if(req.userInfo.role === 'cafeteria'){
		order = await Order.find({
			customer: req.params.id,
			branch: req.userInfo.branch // ordered food should be in that cafeteria
		})
		.populate({
			path: 'customer',
			select: 'name rollNo -_id'
		})
		.select('-branch');
	}
	respondToOrder(order, req.params.id, res, next);
}

async function orderFood(req, res, next){
	const userOrder = {
		...req.body,
		customer: req.userInfo.id
	};

	const order = await Order.create(userOrder);
	res.status(201)
		.json({
			status: 'success',
			data: order
		});
}

async function updateMyOrder(req, res, next){
	
}

function respondToOrder(order, id, res, next){
	if(!order.length){
		return next(new AppError('No order with id found', 404));
	}
	res.status(200)
		.json({
			status: 'success',
			data: {
				order
			}
		});
}

module.exports = {
	getOrder: catchAsync(getOrder),
	getMyOrder: catchAsync(getMyOrder),
	getAllOrders: catchAsync(getAllOrders),
	orderFood: catchAsync(orderFood),
	updateOrder: factoryFunc.updateOne(Order),
	updateMyOrder,
	deleteOrder: factoryFunc.deleteOne(Order)
};