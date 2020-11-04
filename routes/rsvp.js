const express      = require('express');
const router       = express.Router();
const Rsvp         = require('../schema/rsvp');


//--------------------------------------------------
//     ADD RSVP
//--------------------------------------------------
router.post('/add', function(req, res, next){
	var rsvp = new Rsvp({
		guest_1: req.body.guest_1,
		guest_2: req.body.guest_2,
		address_line1: req.body.address_line1,
		address_line2: req.body.address_line2,
		email: req.body.email,
		phone: req.body.phone,
		reg_id: req.body.reg_id,
		wedding_date: req.body.wedding_date,
		event_id: req.body.event_id
	});
	
	rsvp.save(function(err, rsvp){
		if(err){
			console.log("Event save error: " + err);
			res.json({success: false, error: ""+ err});
		} 
		else {
			res.json({ success: true, message: 'rsvp created !', rsvp: rsvp});
			console.log("suceessss")
		}
	});
});


//--------------------------------------------------
//     GET ALL RSVP
//--------------------------------------------------
router.get('/all_rsvps', function(req, res){
	Rsvp.find({})
	.then( function(rsvps){
		if(rsvps){
			res.json({success: true, rsvps: rsvps});
		}
		else{
			res.json({success: false, "getAllRsvp Got error ": + err});
			console.log("getAllRsvp Got error: " + err);
		}
	});
});


//--------------------------------------------------
//     GET RSVP BY ID
//--------------------------------------------------
router.get('/:id', function(req, res, next){
	var id = req.params.id;

	Rsvp.find({"_id": id})
	.then( function(rsvp){
		if(rsvp){
			res.json({success: true, rsvp: rsvp});
		}
		else{
			res.json({success: false, rsvp: err});
		}
	});
});


//--------------------------------------------------
//     GET RSVP BY EVENT ID
//--------------------------------------------------
router.get('/event_id/:id', function(req, res, next){
	var id = req.params.id;

	Rsvp.find({"event_id": id})
	.then( function(rsvp){
		if(rsvp){
			res.json({success: true, rsvp: rsvp});
		}
		else{
			res.json({success: false, rsvp: err});
		}
	});
});


//--------------------------------------------------
//     GET RSVP BY REG ID
//--------------------------------------------------
router.get('/reg_id/:id', function(req, res, next){
	var id = req.params.id;

	Rsvp.find({"reg_id": id})
	.then( function(rsvp){
		if(rsvp){
			res.json({success: true, rsvp: rsvp});
		}
		else{
			res.json({success: false, rsvp: err});
		}
	});
});


//--------------------------------------------------
//     CANCEL RSVP
//--------------------------------------------------
router.get('/cancel/:id', function(req, res, next){
	var id = req.params.id;
	Rsvp.remove({"_id": id})
	.then(function(event){
		if(event){
			res.json({success: true, message: "Rsvp cancel !"});
		}
		else{
			res.json({success: false, message: "Rsvp Not Found cancel !"});	
		}
	});	
});


module.exports = router;
