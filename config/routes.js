var contacts = require('./../server/controllers/contacts.js');

module.exports = function Routes(app) {
	app.get('/', function(req,res) { contacts.index(req,res) });
}