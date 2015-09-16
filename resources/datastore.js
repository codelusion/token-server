'use strict';
var config = require('./../config');
var mongoose = require('mongoose');

function connect() {
mongoose.connect('mongodb://' + 
					config.db.user + ':' + 
					config.db.password + '@' +
					config.db.server + ':' + 
					config.db.port + '/' + 
					config.db.database
				);	
}


var Token = mongoose.model('Token', { 
	study: String,
	resource: String,
	id: String,
	secret: String
	});

module.exports.persist = function persist(data) {
    var token = new Token(data);
	token.save(function(err){
		if (err) {
			console.error(err);
			return null;
		} 
		return token;	
	});
};

module.exports.remove = function remove(data, callback) {
	Token.findOneAndRemove(data, function(err, token){
		if (err) {
			callback(err, null);
		} 
		callback(null, token)
	});
};

module.exports.locate = function locate(data, callback) {
    Token.findOne(data, function (err, token) {
		if (err) {
			callback(err, null);
		}
		callback(null, token);
	});
};