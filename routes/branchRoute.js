const express = require('express');
const authController = require('../controllers/authController');
const branchController = require('../controllers/branchController');

const branchRouter = express.Router();

branchRouter.get('/', branchController.getAllBranches);
branchRouter.get('/:branchName', branchController.getBranch);

branchRouter.use(authController.protectRoute);
branchRouter.patch('/', authController.restrictTo('cafeteria'), branchController.updateMyBranch);

branchRouter.use(authController.restrictTo('admin'));

branchRouter.post('/', branchController.createBranch);
branchRouter.patch('/:id', branchController.updateBranch);
branchRouter.delete('/:id', branchController.deleteBranch);

module.exports = branchRouter;