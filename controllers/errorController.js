const { response } = require('../app');
const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';
	err.message = err.message || 'Something went very wrong';

	if(process.env.NODE_ENV === 'development'){
		sendErrorDev(err, res);
		return;
	}

	let e = {...err}; // copy object by value not reference
	if(err.name === 'CastError'){
		e = handleCastErrorDB(err);
	}
	if(err.code === 11000){
		e = handleDuplicateFieldsDB(err);
	}
	if(err.name === 'ValidationError'){
		e = handleValidationError(err);
	}
	if(err.name === 'JsonWebTokenError'){
		e = handleJWTError();
	}
	if(err.name === 'TokenExpiredError'){
		e = handleJWTExpire();
	}

	sendErrorClient(e, res);
	return;
}

function sendErrorDev(err, res){
	res
		.status(err.statusCode)
		.json({
			status: err.status,
			err,
			message: err.message,
			stack: err.stack
		});
}

function sendErrorClient(err, res){
	if(err.isOperational){
		response
			.status(err.statusCode)
			.json({
				status: err.status,
				message: err.message
			});
	}
	else{
		response
			.status(500)
			.json({
				status: 'Error',
				message: 'Something went wrong'
			});
	}
}

function handleCastErrorDB(error){
	const message = `Invalid ${error.path}: ${error.value}`;
	return new AppError(message, 400);
}

function handleDuplicateFieldsDB(error){
	return new AppError('Duplicate field value. Please use another value');
}

function handleValidationError(error){
	const errorArray = Object.values(error.errors).map(element => element.message); // for every validation error, extract error message
	const message = `Invalid input data. ${errorArray.join('. ')}`;
	return new AppError(message, 400);
}

function handleJWTError(){
	return new AppError('Invalid Token. Please login', 401);
}
function handleJWTExpire(){
	return new AppError('Token Expired. Please login again', 401);
}