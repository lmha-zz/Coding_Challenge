var mongoose = require('mongoose'),
	Contact = mongoose.model('Contact');

module.exports = {
	index: function(req, res) {
		res.render('index', { title: 'SendHub Coding Challenge' })
	},
	index_json: function(req, res) {
		Contact.find({}).sort('contact_name').exec(function(err, orders) {
			res.send(JSON.stringify(orders));
		});
	},
	create: function(req, res) {
		var a = new Contact(req.body.new_contact);
		a.save(function(err) {
			if(err) {
				res.status(418);
				if(11000 === err.code || 11001 === err.code) {
					err.err = "A Contact with that phone number already exists.";
				}
				res.json(err);
			} else {
				res.json(a)
			}
		})
	}
	// ,
	// delete: function(req, res) {
	// 	Contact.remove({ _id: req.params.id }, function(err, win) {
	// 		if(err) {
	// 			res.status(418);
	// 			res.json(err)
	// 		} else {
	// 			res.json(win)
	// 		}
	// 	})
	// }
}