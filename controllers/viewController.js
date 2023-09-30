const authController = require('./authController');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const Canteen = require('../models/CanteenModel');
const Food = require('../models/FoodModel');
const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');

async function getHomepage(req, res, next) {
	const canteens = await Canteen.find();
	res.status(200)
	.render('index', {
		title: 'Cosmos Food Ordering App',
		canteens
	});
}

async function getAllMenu(req, res, next) {
	const foods = await Food.find();
	res.status(200)
		.render('menu', {
			title: 'Menu of Cosmos Food Ordering App',
			h1: 'Menu',
			foods
		});
}

async function getMenu(req, res, next) {
	const canteens = await Canteen.find();

	for(let i = 0, canteen; i < canteens.length; i++){
		canteen = canteens[i];

		if(req.params.canteenSlug === canteen.slug) {
			const foods = await Food.find({canteen: canteen._id});
			res.status(200)
				.render('menu', {
					title: `Menu of ${canteen.name} | Cosmos FOA`,
					h1: `Menu of ${canteen.name}`,
					foods
				});
		}
	};

	const foods = await Food.find();

	res.status(200)
		.render('menu', {
			title: 'Menu of Cosmos Food Ordering App',
			foods
		});
}

async function getCanteen(req, res, next) {
	const canteens = await Canteen.find();
	res.status(200)
		.render('canteen', {
			title: 'Canteens of Cosmos College',
			head: `link rel="stylesheet" href="css/canteen.css"`,
			canteens
		});
}

function getAbout(req, res, next) {
	res.status(200)
		.render('about', {
			title: 'About us || Cosmos Food Ordering App',
			head: `link rel="stylesheet" href="css/about.css"`
		});
}

async function signup(req, res, next) {
	let userDetail = {
		name: req.body.name,
		role: 'customer',
		email: req.body.email,
		phoneNo: req.body.phoneNo,
		password: req.body.password
	};

	const newUser = await User.create(userDetail);

	const token = authController.generateToken(newUser);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_EXPIRATION_JS * 24 * 60 * 60 * 1000),
		HTTPOnly: true // cookie cannot be accessed or modified by browser
	};
	res.cookie('jwt', token, cookieOptions);

	res.status(201)
		.render('signup', {
			title: 'Thank you for signing up || Cosmos Food Ordering App',
			head: `link rel="stylesheet" href="css/signup.css"`,
			user: newUser
		});
}

module.exports = {
	getHomepage: catchAsync(getHomepage),
	getMenu: catchAsync(getMenu),
	getAllMenu: catchAsync(getAllMenu),
	getCanteen,
	getAbout,
	signup: catchAsync(signup)
}