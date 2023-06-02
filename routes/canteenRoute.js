const express = require('express');
const authController = require('../controllers/authController');
const canteenController = require('../controllers/canteenController');

const canteenRouter = express.Router();

canteenRouter.get('/', canteenController.getAllBranches);
canteenRouter.get('/:branchName', canteenController.getBranch);

canteenRouter.use(authController.protectRoute);
canteenRouter.patch('/', authController.restrictTo('cafeteria'), canteenController.updateMyBranch);

canteenRouter.use(authController.restrictTo('admin'));

canteenRouter.post('/', canteenController.createBranch);
canteenRouter.patch('/:id', canteenController.updateBranch);
canteenRouter.delete('/:id', canteenController.deleteBranch);

module.exports = canteenRouter;