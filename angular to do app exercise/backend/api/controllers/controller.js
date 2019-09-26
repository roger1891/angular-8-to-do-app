const mongoose = require('mongoose');
const Job = mongoose.model('Jobs');

//todoList.list_all_jobs
exports.list_all_jobs = (req, res) => {
	Job.find({}, (err, job) => {
		if(err) {
			res.send(err);
		}
		res.json(job);
	});
};

//todoList.create_job
exports.create_job = (req, res) => {
	let new_job = new Job(req.body);
	new_job.save((err, job)=>{
		if(err){
			res.send(err);
		}
		res.json(job)
	});
};


//todoList.read_job
exports.read_job = (req, res) => {
	Job.findById(req.params.jobId, (err, task)=> {
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
};

//todoList.update_job
exports.update_job = (req, res) => {
	Job.findOneAndUpdate({_id: req.params.jobId}, req.body, {new: true}, (err, job) => {
		console.log('this is request of body' +req.body);
		if(err){
			res.send(err);
		}
		res.json(job);
	});
};

//todoList.delete_job
exports.delete_job = (req, res) => {
	Job.remove({
		_id: req.params.jobId
	}, (err, task) => {
		if(err){
			res.send(err);
		}
		res.json({message: 'Job deleted'});
	});
};