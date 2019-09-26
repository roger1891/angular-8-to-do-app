//import modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection criteria
const JobSchema = new Schema({
	name: {
		type: String,
		required: 'Kindly enter name of job'
	},
	description: {
		type: String
	},
	status: {
		type: [{
			type: String,
			enum: ['todo', 'doing', 'done']
		}],
		default: ['todo']
	},
	done: {
		type: Boolean,
		default: false
	},
	date_created: {
		type: Date,
		default: Date.now
	}
});

//export model
module.exports = mongoose.model('Jobs', JobSchema);