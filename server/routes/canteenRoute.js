const express = require('express');
const authController = require('../controllers/authController');
const canteenController = require('../controllers/canteenController');
const reviewRouter = require('./reviewRoute');

const canteenRouter = express.Router({mergeParams: true});

canteenRouter.use('/:canteenId/reviews', reviewRouter);

canteenRouter.get('/', canteenController.getAllBranches);
canteenRouter.get('/:branchName', canteenController.getBranch);

canteenRouter.use(authController.protectRoute);
canteenRouter.patch('/', authController.restrictTo('canteen'), canteenController.updateMyBranch);

canteenRouter.use(authController.restrictTo('admin'));

canteenRouter.post('/', canteenController.createBranch);
canteenRouter.patch('/:id', canteenController.updateBranch);
canteenRouter.delete('/:id', canteenController.deleteBranch);

module.exports = canteenRouter;