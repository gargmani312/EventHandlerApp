const express      = require('express');
const router       = express.Router();
const Event        = require('../schema/event');


//--------------------------------------------------
//     ADD EVENTS
//--------------------------------------------------
router.post('/add', function(req, res, next){
	var event = new Event({
		event_type: req.body.event_type,
		store_number: req.body.store_number,
		store: req.body.store,
		floor: req.body.floor,
		event_date: req.body.event_date,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
		contact_email: req.body.contact_email,
		contact_phone: req.body.contact_phone,
		status: req.body.status
	});

	event.save(function(err, evt){
		if(err){
			console.log("Event save error: " + err);
			res.json({success: false, error: ""+ err});
		}
		else {
			res.json({ success: true, message: 'event created !', event: evt});
			console.log("suceessss")
		}
	});
});


//--------------------------------------------------
//     GET ALL EVENTS
//--------------------------------------------------
router.get('/all_events', function(req, res){
	Event.find({})
	.then( function(events){
		if(events){
			res.json({success: true, events: events});
		}
		else{
			res.json({success: false, "getAllEvent Got error ": + err});
			console.log("getAllEvent Got error: " + err);
		}
	});
});


//--------------------------------------------------
//     GET EVENT BY ID
//--------------------------------------------------
router.get('/:id', function(req, res, next){
	var id = req.params.id;

	Event.find({"_id": id})
	.then( function(event){
		if(event){
			console.log("get Event: " + event);
			res.json({success: true, event: event});
		}
		else{
			console.log("get Event Got error: " + err);
			res.json({success: false, message: "Id not found"});
		}
	});
});


//--------------------------------------------------
//     GET EVENT BY Status
//--------------------------------------------------
router.get('/status/:status', function(req, res, next){
	var status = req.params.status;
	
	Event.find({"status": status})
	.then( function(event){
		if(event){
			console.log("get Event: " + event);
			res.json({success: true, event: event});
		}
		else{
			console.log("get Event Got error: " + err);
			res.json({success: false, message: "status not match"});
		}
	});
});


//--------------------------------------------------
//     Edit EVENT
//--------------------------------------------------
router.post('/edit', function(req, res, next){
	var id = req.body.id;
	var event_type = req.body.event_type;
	var store_number = req.body.store_number;
	var store = req.body.store;
	var floor = req.body.floor;
	var event_date = req.body.event_date;
	var start_time = req.body.start_time;
	var end_time = req.body.end_time;
	var contact_email = req.body.contact_email;
	var contact_phone = req.body.contact_phone;
	var status = req.body.status;

	Event.update({_id: id}, {"$set": {event_type: event_type,
		store_number: store_number,
		store: store,
		floor: floor,
		event_date: event_date,
		start_time: start_time,
		end_time: end_time,
		contact_email: contact_email,
		contact_phone: contact_phone,
		status: status}})
	.exec()
	.then(function(update){
		if(update){
			res.json({success: true, message: "Event Updated !"});
		}
		else{
			res.json({success: false, message: "Event not Updated !"});	
		}
	});
});


//--------------------------------------------------
//     Edit EVENT Status
//--------------------------------------------------
router.post('/update_status', function(req, res, next){
	var id = req.body.id;
	var status = req.body.status;

	Event.update({_id: id}, {"$set": {status: status}})
	.exec()
	.then(function(update){
		if(update){
			res.json({success: true, message: "Event Status Updated !"});
		}
		else{
			res.json({success: false, message: "Event not Updated !"});	
		}
	});
});


//--------------------------------------------------
//     CANCEL EVENT
//--------------------------------------------------
router.get('/cancel/:id', function(req, res, next){
	var id = req.params.id;

	Event.remove({"_id": id})
	.exec(function(err, event){
		if(err){
			res.json({success: true, message: "Event Cancel !", event: event});
		}
		else{
			res.json({success: false, message: "Event Not Found Cancel !"});	
		}
	});	
});


module.exports = router;
