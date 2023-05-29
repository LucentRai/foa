const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/OrderModel');
const factoryFunc = require('./handlerFactory');

async function getMyOrder(req, res, next){
	const order = await Order.find({customer: req.userInfo.id}).select('-customer');
	respondToOrder(order, res, next, req.params.id);
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
	respondToOrder(order, res, next);
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
	respondToOrder(order, res, next, req.params.id);
}

async function orderFood(req, res, next){
	const previousOrder = await Order.find({
		customer: req.userInfo.id,
		branch: req.body.branch
	});
	if(previousOrder.length){
		if(!req.body.foods || !req.body.portion || !req.body.quantity){
			return next(new AppError('Insufficient data provided', 403));
		}
		previousOrder[0].foods.push(...req.body.foods);
		previousOrder[0].portion.push(...req.body.portion);
		previousOrder[0].quantity.push(...req.body.quantity);
		const obj = {
			foods: previousOrder[0].foods,
			portion: previousOrder[0].portion,
			quantity: previousOrder[0].quantity
		};
		const order = await Order.findByIdAndUpdate(previousOrder[0]._id, obj,{
			new: true
		});

		res.status(200)
			.json({
				status: 'success',
				data: order
			});
		return;
	}

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
	const updatedOrder = {
		...req.body,
		customer: req.userInfo.id
	};
	
}

function respondToOrder(order, res, next, id){
	if(!order.length){
		if(id){
			const errorMessage = `No order with ${id} found`;
		}
		else{
			const errorMessage = 'No order found';
		}
		return next(new AppError(errorMessage, 404));
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