module.exports = (app) => {
	//import file
	const todoList = require('../controllers/controller.js');
	
	//routes
	app.route('/jobs')
		.get(todoList.list_all_jobs)
		.post(todoList.create_job);
		
	app.route('/jobs/:jobId')
		.get(todoList.read_job)
		.put(todoList.update_job)
		.delete(todoList.delete_job);
};