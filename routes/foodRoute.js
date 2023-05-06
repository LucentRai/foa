const express = require('express');
const foodController = require('../controllers/foodController');

const router = express.Router();

router.route('/')
	.get(foodController.getAllFood)
	.post(foodController.createFood);

router.route('/:id')
	.get(foodController.getFood)
	.patch(foodController.updateFood)
	.delete(foodController.deleteFood);

module.exports = router;