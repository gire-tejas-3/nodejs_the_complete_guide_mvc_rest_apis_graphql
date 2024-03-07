const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: {
		type: String,
	},
	middlename: {
		type: String,
	},
	lastname: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	contact: {
		type: Number,
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
	},
	dateOfBirth: {
		type: Date,
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department',
	},
	designation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Designation',
	},
	isActive: {
		type: Boolean,
		enum: [true, false],
		default: true
	},
	profileImage: {
		type: String,
	},
	leaves: [{
		data: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leave',
		}
	}],
});

module.exports = mongoose.model('User', UserSchema);
