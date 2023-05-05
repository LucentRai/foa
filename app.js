const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if(process.env.NODE_ENV === 'development'){ // for logging in development
	const morgan = require('morgan');
	app.use(morgan('dev'));
}


// ROUTERS
const foodRouter = require('./routes/foodRoute');
const customerRouter = require('./routes/customerRoute');
const orderRouter = require('./routes/orderRoute');

app.use(express.json({limit: '10kb'}));
app.use(mongoSanitize());


// ROUTES
app.use('/foods', foodRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;