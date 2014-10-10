sendHubApp.factory('ContactFactory', function($http) {
	var factory = {};
	var contacts = [];
	factory.getContacts = function(callback) {
		$http.get('/contacts.json').success(function(allContacts) {
			contacts = allContacts;
			callback(allContacts);
		})
	}
	factory.createContact = function(contact, errCallback, succsCallback) {
		$http.post('/contacts/create', { new_contact: contact })
			.success(function(data) {
				contacts.unshift(data);
				succsCallback(contacts);
			})
			.error(function(err) {
				errCallback(err);
			})
	}
	return factory;
})