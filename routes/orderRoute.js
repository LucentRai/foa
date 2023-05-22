const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.use(authController.protectRoute);

orderRouter.route('/')
	.post(authController.restrictTo('student', 'customer', 'admin'), orderController.orderFood)
	.post(authController.restrictTo('admin'), orderController.createOrder)
	.patch(authController.restrictTo('admin'), orderController.updateOrder);

orderRouter.get('/my-order', authController.restrictTo('student', 'customer', 'admin'), orderController.getMyOrder);
orderRouter.get('/all', authController.restrictTo('admin', 'cafeteria'), orderController.getAllOrders);

orderRouter.route('/:id')
	.get(authController.restrictTo('admin', 'cafeteria'), orderController.getOrder)
	.patch(authController.restrictTo('student', 'customer'), orderController.updateMyOrder)
	.delete(orderController.deleteOrder);

module.exports = orderRouter;