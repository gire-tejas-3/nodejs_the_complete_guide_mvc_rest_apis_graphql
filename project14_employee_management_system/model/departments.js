const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
	departmentName: {
		type: String,
		required: true,
	},
	departmentAbbr: {
		type: String,
		required: true,
	},
    createdAt: {
        type: Date,
        default: Date.now(),
    },
	updatedAt: {
		type: Date
	}
});

module.exports = mongoose.model('Department', DepartmentSchema);
