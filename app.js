const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if(process.env.NODE_ENV === 'development'){ // for logging in development
	const morgan = require('morgan');
	app.use(morgan('dev'));
}


/****************** ROUTERS ******************/
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const reviewRouter = require('./routes/reviewRoute');
const canteenRouter = require('./routes/canteenRoute');

app.use(express.json({limit: '10kb'}));
app.use(mongoSanitize());


/****************** ROUTES ******************/
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/review', reviewRouter);
app.use('/api/canteen', canteenRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;