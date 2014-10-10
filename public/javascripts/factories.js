sendHubApp.factory('ContactFactory', function($http) {
	var urlUsername = "8587075261";
	var apiKey = "d64b323515f040f41028aa2fe981af40f44ca6d3";
	var factory = {};
	var contacts = [];
	factory.getContacts = function(callback) {
		var url = "https://api.sendhub.com/v1/contacts/?username="+urlUsername+"&api_key="+apiKey;
		$http.get(url)
		.success(function(data) {
			contacts = data.objects;
			callback(contacts);
		})
	}
	factory.createContact = function(contact, errCallback, succsCallback) {
		var url = "https://api.sendhub.com/v1/contacts/?username="+urlUsername+"&api_key="+apiKey;
		console.log(contact)
		$http.post(url,
		{
			name: contact.contact_name,
			number: contact.phone_number
		}
		)
		.success(function(data) {
			contacts.unshift(data);
			succsCallback(contacts);
		})
		.error(function(err) {
			if(!(err["name"] == undefined)) {
				err.name[0] = "Contact name required.";
			}
			console.log(err["number"])
			if(err["number"] != undefined && err['number'] == "That number is already in your contacts.") {
				err.number[0] = "Phone number is already in your contacts.";
			} else {
				err.number[0] = "Phone number required.";
			}
			errCallback(err);
		})
	}
	factory.updateContact = function(contactID, contact, errCallback, succsCallback) {
		var url = "https://api.sendhub.com/v1/contacts/"+contactID+"/?username="+urlUsername+"&api_key="+apiKey;
		$http.put(url, {
			id: contactID,
			name: contact.contact_name,
			number: contact.phone_number
		})
		.success(function(data) {
			succsCallback(data);
		})
		.error(function(err) {
			if(!(err["name"] == undefined)) {
				err.name[0] = "Contact name required.";
			}
			if(!(err["number"] == undefined)) {
				err.number[0] = "Phone number required.";
			}
			errCallback(err);
		})
	}
	factory.deleteContact = function(contactID, index, errCallback, succsCallback) {
		var url = "https://api.sendhub.com/v1/contacts/"+contactID+"/?username="+urlUsername+"&api_key="+apiKey;
		$http.delete(url)
		.success(function(win){
			contacts.splice(index,1);
			succsCallback();
		})
		.error(function(err){
			errCallback(err);
		})
	}
	return factory;
})

sendHubApp.factory('MessageFactory', function($http){
	var urlUsername = "8587075261";
	var apiKey = "d64b323515f040f41028aa2fe981af40f44ca6d3";
	var factory = {};

	factory.createMessage = function(number, message, callback) {
		var url = "https://api.sendhub.com/v1/messages/?username="+urlUsername+"&api_key="+apiKey;
		$http.post(url,
			{
				contacts: [number],
				text: message.text_message
			}
		)
			.success(function(win) {
				callback(win.acknowledgment);
			})
	}
	return factory;
})