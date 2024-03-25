const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AppError = require('../utils/error');
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
		required: function () {
			return this.googleId ? false : true;
		},
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
		default: 'male',
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
		file: { type: Buffer },
		filename: { type: String },
		mimetype: { type: String },
	},
	resume: {
		file: { type: Buffer },
		filename: { type: String },
		mimetype: { type: String },
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
	accessToken: {
		type: String,
	},
	refreshToken: {
		type: String,
	},
});

UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await bcrypt.hash(this.password, 15);
		next();
	} catch (error) {
		next(new AppError(error, 500));
	}
});

module.exports = mongoose.model('User', UserSchema);
