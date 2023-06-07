const foodController = require('../controllers/foodController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoute');
const express = require('express');

const foodRouter = express.Router();

foodRouter.use('/:foodId/reviews', reviewRouter);

foodRouter.get('/menu/', foodController.getAllMenu);
foodRouter.get('/menu/:canteenSlug', foodController.getCanteenMenu);
foodRouter.get('/:id', foodController.getFood);


foodRouter.use(authController.protectRoute);

foodRouter.post('/', authController.restrictTo('canteen', 'admin'), foodController.createMenu);

foodRouter.patch('/update', authController.restrictTo('canteen'), foodController.updateMyMenu);
foodRouter.delete('/delete/:id', authController.restrictTo('canteen'), foodController.deleteMyMenu);

foodRouter.use(authController.restrictTo('admin'));
foodRouter.route('/:id')
	.patch(foodController.updateMenu)
	.delete(foodController.deleteMenuItem);

module.exports = foodRouter;