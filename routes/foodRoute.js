const foodController = require('../controllers/foodController');
const authController = require('../controllers/authController');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const express = require('express');

const foodRouter = express.Router();

foodRouter.get('/menu/', foodController.getAllMenu);
foodRouter.get('/menu/:canteenSlug', foodController.getCanteenMenu);
foodRouter.get('/:id', foodController.getFood);


foodRouter.use(authController.protectRoute, authController.restrictTo('canteen', 'admin'));

foodRouter.post('/', foodController.createMenu);

foodRouter.route('/:id')
	.patch(foodController.updateMenu)
	.delete(foodController.deleteMenuItem);

module.exports = foodRouter;