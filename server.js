const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = require('./app');

mongoose
	.connect(process.env.LOCAL_DB)
	.then( _ => console.log('DATABASE CONNECTED'));

