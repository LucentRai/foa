const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Canteen = require('../models/CanteenModel');
const Food = require('../models/FoodModel');
const Review = require('../models/ReviewModel');
const User = require('../models/UserModel')

async function getHomepage(req, res, next) {
	const canteens = await Canteen.find();
	res.status(200)
	.render('index', {
		title: 'Cosmos Food Ordering App',
		canteens
	});
}

async function getMenu(req, res, next) {
	const menu = await Food.find({canteen: 'Block A'});

	res.status(200)
		.render('menu', {
			title: 'Menu of Cosmos Food Ordering App'
		});
}

async function getCanteen(req, res, next) {
	res.status(200)
		.render('canteen', {
			title: 'Canteens of Cosmos College',
			head: `link rel="stylesheet" href="/css/canteen.css"`,

		});
}

function getAbout(req, res, next) {
	res.status(200)
		.render('about', {
			title: 'About us || Cosmos Food Ordering App'
		});
}

module.exports = {
	getHomepage: catchAsync(getHomepage),
	getMenu,
	getCanteen,
	getAbout
}