//------------------------------------------------------
//   Script for testing various models of the schema
//------------------------------------------------------

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Event      = require('../schema/event');
const Rsvp 	     = require('../schema/rsvp');
const User 	     = require('../schema/user');

function addEventThenRsvp(){
	var event = new Event({
		event_type: "MainEvent",
		store_number: "1",
		store: "event",
		floor: "ground",
		event_date: "12/2/2017",
		start_time: "2:23",
		end_time: "3:45",
		contact_email: "tom@gmail.com",
		contact_phone: "122345",
		status: "success"
	});
	event.save(function(err, s){

		if(err) {
			console.log("Failed to save Event, got error: " + err);
		} else {
			console.log("Successfully saved Event: \n" + s);
			addRsvp(s._id);
		}
	});
}


function addRsvp(event_id){
	var rsvp = new Rsvp({
		guest_1: "tom",
		guest_2: "jerry",
		address_line1: "Us",
		address_line2: "us",
		email: "tom@gmail.com",
		phone: "123098",
		req_id: "Abd",
		wedding_date: "12/4/2017",
		event_id: event_id
	});
	rsvp.save(function(err, s){
		if(err){
			console.log("Failed to save Rsvp, Got error: " + err);
		}else{
			console.log("Successfully saved rsvp: \n" +s);
		}
	});
}


function addUser(){
	var user = new User({
		first_name: "tom",
		last_name: "jerry",
		username: "tj",
		email: "tj@gmail.com",
		password: "123"
	});
	user.save(function(err, s){

		if(err) {
			console.log("Failed to save user, got error: " + err);
		} else {
			console.log("Successfully saved user: \n" + s);
		}
	});
}

function getAllRsvp(){
	Rsvp.find({})
	.populate('event_id')
	.then( function(rsvps){
		if(rsvps){
			console.log("total Rsvp: \n" + rsvps);
		}
		else{
			console.log("getAllRsvp Got error: " + err);
		}
		
			
	});
}

// step 1: conenct to mongodb
const MONGODB_URI = "mongodb://harszz:cmsevents@ds141786.mlab.com:41786/registrycms";

mongoose.connect(MONGODB_URI, function(err) {
    if(err) {
        console.log("[SchemaTest] failed to connect to database: " + err);
        return;
    } 

    console.log("[SchemaTest] Successfully connected to database. ");

    // step 2: save schema's in db
    //addEventThenRsvp();
    //getAllRsvp();
    //addUser();
});
