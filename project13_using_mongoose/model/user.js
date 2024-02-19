const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	terms: String,
	role: {
		type: String,
        enum: ['admin', 'user'],
        default: 'user',
		required: true, 
	},
});

module.exports =  mongoose.model('User', userShema);
