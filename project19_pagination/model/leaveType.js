const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveTypeSchema = new Schema({
	leaveType: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	maxDaysAllowed: {
		type: String,
	},
});

module.exports = mongoose.model('LeaveType', LeaveTypeSchema);
