var urlUsername = "8587075261";
var apiKey = "d64b323515f040f41028aa2fe981af40f44ca6d3";
var http = require('http');
var request = require('request');

module.exports = {
	index: function(req, res) {
		res.render('index')
	},
	index_json: function(req, res) {
		var url = "https://api.sendhub.com/v1/contacts/?username="+urlUsername+"&api_key="+apiKey;
		request.get(url, function(error, response, body) {
			var data = JSON.parse(body);
			if(!error && response.statusCode == 200) {
				res.json(data.objects);
			}
		})	
	},
	create: function(req, res) {
		var err = {};
		var url = "https://api.sendhub.com/v1/contacts/?username="+urlUsername+"&api_key="+apiKey;
		console.log(req.body.contact);

		
		if(req.body.contact.contact_name == undefined || req.body.contact.contact_name == '') {
			err["name"][0] = "Contact name required.";
		}
		if(req.body.contact.phone_number == undefined || req.body.contact.phone_number == '') {
			err["number"][0] = "Phone number required.";
		} else {
			console.log(req.body.contact.phone_number.toString().length)
			if(req.body.contact.phone_number.toString().length != 10) {
				if(req.body.contact.phone_number.toString().length < 10 || req.body.contact.phone_number.toString().length > 10) {
					err["number"] = "Phone number must be 10 digits long.";
				}
				if(!(/^\d+$/.test(req.body.contact.phone_number))) {
					err["number"] = "Phone number can only contain digist.";
				}
			} else {
				request(
					{ url: url,
						body: JSON.stringify(data) }, function(err, httpResponse, body) {
					if(err) {
						res.json(err);
					}
				})
				
			}
		}

		// request.post(url, function(err, httpResponse, body) {
		// 	if(err != undefined) {
		// 		return console.error('upload failed: ', err, typeof(err));
		// 	}
		// 	// console.log('http response ', httpResponse);
		// 	console.log('upload successful! ', body, typeof(body));

		// })
			// .form({
			// 	name: req.body.contact.contact_name,
			// 	number: req.body.contact.phone_number
			// });
		// .success(function(data) {
		// 	contacts.unshift(data);
		// 	succsCallback(contacts);
		// })
		// .error(function(err) {
		// 	if(!(err["name"] == undefined)) {
		// 		err.name[0] = "Contact name required.";
		// 	}
		// 	if(err["number"] != undefined && err['number'] == "That number is already in your contacts.") {
		// 		err.number[0] = "Phone number is already in your contacts.";
		// 	} else {
		// 		err.number[0] = "Phone number required.";
		// 	}
		// 	errCallback(err);
		// })	
	}
}