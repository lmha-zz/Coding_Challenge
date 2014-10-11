var contacts = require('./../server/controllers/contacts.js');

module.exports = function Routes(app) {
	app.get('/', function(req,res) { contacts.index(req,res) });
	app.get('/contacts.json', function(req, res){ contacts.index_json(req,res) });
	app.post('/contacts/create', function(req, res){ contacts.create(req,res) });
}