const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(authController.protectRoute);

router.route('/')
	.get(orderController.getOrder)
	.post(authController.restrictTo('student', 'customer'), orderController.orderFood)
	.post(authController.restrictTo('admin'), orderController.createOrder);

router.route('/:id')
	.get(authController.restrictTo('admin', 'cafeteria'), orderController.getOrder)
	.patch(authController.restrictTo('admin', 'student', 'customer'), orderController.updateOrder)
	.delete(orderController.deleteOrder);

module.exports = router;