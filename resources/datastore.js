'use strict';
var config = require('./../config');
var mongoose = require('mongoose');
var db = config.db.local;
//var db = config.db.remote;
if (db.user) {
    mongoose.connect('mongodb://' +
        db.user + ':' +
        db.password + '@' +
        db.server + ':' +
        db.port + '/' +
        db.database
    );
} else {
    mongoose.connect('mongodb://' +
        db.server + ':' +
        db.port + '/' +
        db.database
    );
}

var Token = mongoose.model('Token', {
	study: String,
	resource: String,
	apiId: String,
	apiSecret: String
	});

module.exports.persist = function persist(data, callback) {
    var token = new Token(data);
	token.save(function(err){
		if (err) {
			console.error(err);
			callback(err, null);
		} else {
			callback(null, token);
		}
	});
};

module.exports.remove = function remove(data, callback) {
	Token.findOneAndRemove(data, function(err, token){
		if (err) {
			callback(err, null);
		} else {
			callback(null, token)
		}
	});
};

module.exports.locate = function locate(data, callback) {
    Token.find(data, function (err, tokens) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, tokens);
		}
	});
};