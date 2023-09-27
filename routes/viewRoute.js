const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.use(authController.isLoggedIn);

viewRouter.get('/', viewController.getHomepage);
viewRouter.get('/menu/', viewController.getAllMenu);
viewRouter.get('/menu/:canteenSlug', viewController.getMenu);
viewRouter.get('/canteen', viewController.getCanteen);
viewRouter.get('/about', viewController.getAbout);

module.exports = viewRouter;