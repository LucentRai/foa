const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.get('/', viewController.getHomepage);
viewRouter.get('/menu', viewController.getMenu);
viewRouter.get('/canteen', viewController.getCanteen);
viewRouter.get('/about', viewController.getAbout);

module.exports = viewRouter;