const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = require('./app');

mongoose
	.connect(process.env.LOCAL_DB)
	.then( () => console.log('DATABASE CONNECTED'));

const server = app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

process.on('uncaughtException', err => {
	console.log(err.name, err.message);
	console.log('Unhandled Exception: Shutting Down...');
	process.exit(1);
});
process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('Unhandled Rejection: Shutting Down...');

	server.close(() => {
		process.exit(1);
	});
});