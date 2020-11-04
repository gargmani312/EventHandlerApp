const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
	guest_1: {
		type: String,
		required: true
	},
	guest_2: {
		type: String,
		required: true
	},
	address_line1: {
		type: String,
		required: true
	},
	address_line2: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	reg_id: {
		type: String,
		required: true
	},
	wedding_date: {
		type: Date,
		required: true
	},
	event_id: {
  		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Event'
	}
});

module.exports = mongoose.model("Rsvp", RsvpSchema);
