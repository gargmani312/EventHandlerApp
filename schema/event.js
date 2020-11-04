const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
	{
		event_type: {
			type: String,
			required: true
		},
		store_number: {
			type: String,
			required: true
		},
		store: {
			type: Object,
			required: true
		},
		floor: {
			type: String,
			required: true
		},
		event_date: {
			type: Date,
			required: true
		},
		start_time: {
			type: String,
			required: true
		},
		end_time: {
			type: String,
			required: true
		},
		contact_email: {
			type: String,
			required: true
		},
		contact_phone: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
	});

module.exports = mongoose.model("Event", EventSchema);
