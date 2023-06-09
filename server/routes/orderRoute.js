const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.use(authController.protectRoute);

orderRouter.route('/')
	.post(authController.restrictTo('student', 'customer', 'admin'), orderController.orderFood)
	.patch(authController.restrictTo('admin'), orderController.updateOrder);

orderRouter.get('/my-order', authController.restrictTo('student', 'customer', 'admin'), orderController.getMyOrder);
orderRouter.get('/all', authController.restrictTo('admin', 'canteen'), orderController.getAllOrders);
orderRouter.delete('/delete/:id', authController.restrictTo('admin'), orderController.deleteOrder);

orderRouter.route('/:id')
	.get(authController.restrictTo('admin', 'canteen'), orderController.getOrder)
	.patch(authController.restrictTo('student', 'customer'), orderController.updateMyOrder)
	.delete(authController.restrictTo('admin', 'canteen'), orderController.deleteOrder);

module.exports = orderRouter;