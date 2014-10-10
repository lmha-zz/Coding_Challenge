var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema ({
	contact_name: { type: String, required: "A contact name is required." },
	phone_number: { type: Number, required: "Phone number is required.", unique: true },
	create_date: { type: Date, default: new Date().getTime() },
	update_date: { type: Date, default: new Date().getTime() },
	hidden: Boolean,
});

mongoose.model('Contact', ContactSchema);