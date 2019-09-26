# angular-8-to-do-app
Trying to get familiar with angular 8 framework

Built a To Do App using Angular, Express and Mongoose.

Goal: The goal of this project was to get familiar with Angular and some basic Angular functionalities such as components, services and models.

Description:
The API was built with express to provide http endpoints using CRUD to be later on accessed via Angular. The routes that can be used for CRUD actions are as follows:  

//routes
	app.route('/jobs')
		.get(todoList.list_all_jobs)
		.post(todoList.create_job);
		
	app.route('/jobs/:jobId')
		.get(todoList.read_job)
		.put(todoList.update_job)
		.delete(todoList.delete_job);
    
Angular was later on used to create the user interface and to manipulate data via CRUD. 
The data was saved in a mongoose database
