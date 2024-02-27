const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignationSchema = new Schema({
	designation: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Designation', DesignationSchema);
