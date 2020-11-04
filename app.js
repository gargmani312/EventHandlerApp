const express      =  require('express');
const bodyParser   =  require('body-parser');
const mongoose     =  require('mongoose');
const Event        =  require('./schema/event');
const Rsvp         =  require('./schema/rsvp');
const User         =  require('./schema/user');
const event        =  require('./routes/event');
const rsvp         =  require('./routes/rsvp');
const user         =  require('./routes/user');

const TokenMaker   =  require('./helpers/tokenMaker');
const jsonwebtoken =  require('jsonwebtoken');

const app          =  express();
const SECRET_KEY   =  "MyEventAPI"

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.get('/api/demo', function(req, res){
	    res.sendFile(__dirname + "/templates/" + "index.html");
});


//---------------------------------------------------
// url ignore list for token validation middleware
//---------------------------------------------------
var ignore_list = [
    '/api/user', 
    '/api/user/login',
    '/api/rsvp/add',
    '/api/rsvp/cancel/:id',
    '/api/event/all_events'  
];


//---------------------------------------------------
//  Token Validation Middleware
//---------------------------------------------------
app.use(function(req, res, next){
	if(ignore_list.indexOf(req.originalUrl) > -1){
		console.log("ignore: ");
		return next();
	}

	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	if (token) {

		jsonwebtoken.verify(token, SECRET_KEY, function(err, decoded){
			if (err) {
				console.log("Got exception: " +err);
			}
			else{
				req.decoded = decoded;
				console.log("decoded: " + JSON.stringify(req.decoded));	
				next();
			}

		});
	}
	else{
		res.send({success: false, message: "No token provided!"});
	}

});//use


//--------------------------------------------------
// adding routers
//--------------------------------------------------
app.use('/api/event/', event);
app.use('/api/rsvp/', rsvp);
app.use('/api/user/', user);


//--------------------------------------------------
// Connect to data base
//--------------------------------------------------
mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://harszz:cmsevents@ds141786.mlab.com:41786/registrycms";
mongoose.connect(MONGODB_URI, function(err) {
    if(err) {
        console.log("[MyEvent] failed to connect to database: " + err);
        return;
    } 
    console.log("[MyEvent] Successfully connected to database. ");
});


//--------------------------------------------------
//    STARTING SERVER
//--------------------------------------------------
var server = app.listen(8081, function (err) {

	if(err){
		console.log(err);
	}
	else{
		var host = server.address().address
   		var port = server.address().port

   		console.log("Example app listening at http://%s:%s", host, port);
   	}
})
