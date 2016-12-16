//server.js

//modules ==========================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');


//mongoose.connect('mongodb://bw_thomas:Pizzaparty247@ds033096.mlab.com:33096/meanstacktest');
//local DB

var db = require('./config/db');

mongoose.connect(db.url, function(err, db) {
    if(!err) {
        console.log('connected!');
    }else {
        console.log('wtf mate');
    }
});
//configure app tp use bodyParser()
//get the data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set the server port
var port = process.env.PORT || 8080;

//set static file location
app.use(express.static(__dirname + '/public'));

//REGISTER OUR ROUTES ===============================================
//all routes prefixed with api
//require('./app/routes')(app); // configure our routes
var api = require('./app/routes');
app.use('/api', api);

// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function(req, res) {
   res.sendfile('./public/views/index.html'); // load our public/index.html file
});

//start app =========================================================
//startup our app at http://localhost:8080
app.listen(port);

//shotout to user
console.log('Magic happens on port ' + port);

module.exports = app;
