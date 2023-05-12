const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getOne = Model => {
	return catchAsync(async (req, res, next) => {
		const document = await Model.findById(req.params.id);
		if(!document){
			return next(new AppError(`No document with ${req.params.id} found`, 404));
		}

		res.status(200)
			.json({
				status: 'success',
				data: {
					document
				}
			});
	});
};

exports.getAll = Model => {
	return catchAsync(async (req, res, next) => {
		const document = await Model.find();
		res.status(200)
			.json({
				status: 'success',
				results: document.length,
				data: {
					document
				}
			});
	});
};

exports.createOne = Model => {
	return catchAsync(async (req, res, next) => {
		const document = await Model.create(req.body);
		res.status(201)
			.json({
				status: 'success',
				data: document
			});
	});
};

exports.updateOne = Model => {
	return catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if(!document){
			return next(new AppError(`No document with id ${req.params.id} found`, 404));
		}

		res.status(200)
			.json({
				status: 'success',
				data: document
			});
	});
};

exports.deleteOne = Model => {
	return catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndDelete(req.params.id);
		if(!document){
			return next(new AppError(`No document with id ${req.params.id} found`), 404);
		}
		res.status(204).json();
	});
};