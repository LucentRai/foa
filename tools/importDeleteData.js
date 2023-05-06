const fs = require('fs');
const mongoose = require('mongoose');
const Food = require('../models/FoodModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../config.env`});

mongoose
	.connect(process.env.LOCAL_DB)
	.then(() => console.log('DATABASE CONNECTED'));

if(process.argv[2] === '--import'){
	importData();
}
else if(process.argv[2] === '--delete'){
	deleteData();
}
else{
	console.log('Provide additional command \n\
	node importDeleteData.js --import [imports data to database] \n\
	node importDeleteData.js --delete [deletes all data from database]');
}

async function importData(){
	try{
		const foods = JSON.parse(fs.readFileSync(`${__dirname}/data/foods.json`, 'utf-8'));
		const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
		const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8'));

		await Food.create(foods);
		await User.create(users);
		await Order.create(orders);

		console.log('Data Imported Successfully');
	}
	catch(err){
		console.log(err);
	}
	process.exit(); // aggressively ends the process; if you put this outside on the main block, database will not be connected when Model is used (don't know why)
}

async function deleteData(){
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