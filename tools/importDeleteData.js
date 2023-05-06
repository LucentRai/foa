const fs = require('fs');
const mongoose = require('mongoose');
const Food = require('./../models/FoodModel');
const dotenv = require('dotenv');

dotenv.config({path: `../config.env`});

mongoose
	.connect(process.env.LOCAL_DB)
	.then(() => console.log('DATABASE CONNECTED'))
	.catch((err) => console.log(err));

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
process.exit();

async function importData(){
	try{
		const foods = JSON.parse(fs.readFileSync(`${__dirname}/data/foods.json`, 'utf-8'));
		const r = await Food.create(foods);
		console.log(r);
		console.log('Data Imported Successfully');
}
	catch(err){
		console.log(err);
	}
}

async function deleteData(){
	try{
		await Food.deleteMany();
		console.log('Data Deleted Successfully');
	}
	catch(err){
		console.log(err);
	}
}