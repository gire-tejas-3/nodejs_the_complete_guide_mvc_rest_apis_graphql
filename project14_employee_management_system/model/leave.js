const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
	leaveType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'LeaveType',
	},
	description: {
		type: String,
		required: true,
	},
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required:  true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Leave', LeaveSchema);
