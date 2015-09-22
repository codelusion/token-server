'use strict';

var Token = require('./schema');

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

module.exports.removeOne = function remove(data, callback) {
	Token.findOneAndRemove(data, function(err, token){
		if (err) {
			callback(err, null);
		} else {
			callback(null, token)
		}
	});
};

module.exports.removeAll = function remove(data, callback) {
	Token.remove(data, function(err, tokenCount){
		if (err) {
			callback(err, null);
		} else {
			callback(null, tokenCount)
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