const Food = require('../models/FoodModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

async function getFood(req, res, next){
	let foods = {};

	if(!req.params.id){
		foods = await Food.find();
	}
	else{
		foods = await Food.findById(req.params.id);
		if(!foods){
			next(new AppError(`No food with id ${req.params.id} found`, 404));
		}
	}

	res
		.status(200)
		.json({
			status: 'success',
			data: foods
		});
}

async function createFood(req, res, next){
	const food = await Food.create(req.body);
	res
		.status(200)
		.json({
			status: 'success',
			data: food
		});
}

async function updateFood(req, res, next){
	const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if(!food){
		next(new AppError(`No food with id ${req.params.id} found`, 404));
	}

	res
		.status(200)
		.json({
			status: 'success',
			data: food
		});
}

async function deleteFood(req, res, next){
	const food = await Food.findByIdAndDelete(req.params.id);

	if(!food){
		return next(new AppError(`No food with id ${req.params.id} found`, 404));
	}
	res
		.status(204).json();
}

module.exports = {
	getFood: catchAsync(getFood),
	createFood: catchAsync(createFood),
	updateFood: catchAsync(updateFood),
	deleteFood: catchAsync(deleteFood)
};