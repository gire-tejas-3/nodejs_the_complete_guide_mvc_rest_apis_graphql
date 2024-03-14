const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	googleId: {
		type: String,
	},
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
		required: true,
	},
	contact: {
		type: Number,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: function() {
            return this.googleId ? false : true;
        }
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		required: true,
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		default: 'male'
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
	profileImage: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		enum: [true, false],
		default: false,
	},
	isActive: {
		type: Boolean,
		enum: [true, false],
		default: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
