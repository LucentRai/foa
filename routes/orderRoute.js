const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/')
	.get(authController.restrictTo('admin'), orderController.getAllOrders)
	.post(authController.restrictTo('student', 'customer'), orderController.orderFood)
	.post(authController.restrictTo('admin'), orderController.createOrder);

router.route('/:id')
	.get(orderController.getOrder)
	.patch(authController.restrictTo('admin', 'student', 'customer'), orderController.updateOrder)
	.delete(orderController.deleteOrder);

module.exports = router;