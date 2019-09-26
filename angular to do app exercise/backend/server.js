//import modules
const express = require('express');
const app = express();
const port = process.env.PORRT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
Job = require('./api/models/model');
bodyParser = require('body-parser');

//mongoose connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/todoListDB');
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB'); //connects to db and creates todoListDB Document

let corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

//import route
let routes = require('./api/routes/routes');
//register the route
routes(app)

//listen to port
app.listen(port);

//log to console
console.log("todo list RESTful API server starts on: " + port);

app.use((req, res)=>{
	res.status(404).send({url: req.originalUrl + ' not found'});
});