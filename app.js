const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

/****************** ROUTERS ******************/
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const reviewRouter = require('./routes/reviewRoute');
const canteenRouter = require('./routes/canteenRoute');
const viewRouter = require('./routes/viewRoute');


const app = express();
app.use(cors());

app.set('view engine', 'pug'); // pug template engine
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // serving static files
if(process.env.NODE_ENV === 'development'){ // for logging in development
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

app.use(express.json({limit: '10kb'})); // parse data from body
app.use(express.urlencoded({extended: true, limit: '10kb'}) ); // parse data from url
app.use(cookieParser()); // parse cookies from header



/****************** ROUTES ******************/
app.use('/', viewRouter);
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