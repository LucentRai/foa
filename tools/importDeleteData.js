const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../config.env`});

mongoose
	.connect(process.env.DB_LOCAL)
	.then(() => console.log('DATABASE CONNECTED'));

if(process.argv[2] === '--import'){
	importData();
}
else if(process.argv[2] === '--delete'){
	deleteData();
}
else{
	console.log('Provide additional arguments \n\
		node importDeleteData.js --import \t imports data to database \n\
		node importDeleteData.js --delete \t deletes all data from database');
}

async function importData(){
	try{
		if(!process.argv[3]){
			const Food = require('../models/FoodModel');
			const Order = require('../models/OrderModel');
			const User = require('../models/UserModel');
			const Review = require('../models/ReviewModel');

			const foods = JSON.parse(fs.readFileSync(`${__dirname}/data/foods.json`, 'utf-8'));
			const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
			const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8'));
			const reviews = JSON.parse(fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8'));

			await Food.create(foods);
			await User.create(users);
			await Order.create(orders);
			await Review.create(reviews);

			console.log('Data Imported Successfully');
			return;
		}

		switch(process.argv[3]){
			case 'F':
			case 'f':
			case 'food':
				const Food = require('../models/FoodModel');
				const foods = JSON.parse(fs.readFileSync(`${__dirname}/data/foods.json`, 'utf-8'));
				await Food.create(foods);
				console.log('Food data imported successfully');
				break;

			case 'O':
			case 'o':
			case 'order':
				const Order = require('../models/OrderModel');
				const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8'));
				await Order.create(orders);
				console.log('Order data imported successfully');
				break;

			case 'U':
			case 'u':
			case 'users':
				const User = require('../models/UserModel');
				const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
				await User.create(users, {validateBeforeSave: false});
				console.log('Users data imported successfully');
				break;

			case 'R':
			case 'r':
			case 'reviews':
				const Review = require('../models/ReviewModel');
				const reviews = JSON.parse(fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8'));
				await Review.create(reviews);
				console.log('Reviews data imported successfully');
				break;

			default:
				throw "Unrecognized argument";
				break;
		}
	}
	catch(err){
		console.log(err);
	}
	finally {
		process.exit(); // aggressively ends the process; if you put this outside on the main block, database will not be connected when Model is used (don't know why)
	}
}

async function deleteData(){
	const Food = require('../models/FoodModel');
	const Order = require('../models/OrderModel');
	const User = require('../models/UserModel');
	try{
		await Food.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		console.log('Data Deleted Successfully');
	}
	catch(err){
		console.log(err);
	}
	process.exit(); // aggressively ends the process; if you put this outside on the main block, database will not be connected when Model is used (don't know why)
}