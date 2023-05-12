const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');

// mongoose
// 	.connect('mongodb://127.0.0.1:27017/foa')
// 	.then(() => console.log('DATABASE CONNECTED'));
const a = bcrypt.hash('test1234', 12)
	.then(hash => console.log(hash));
