'use strict';

var Client = require('../schema').ClientSchema;

module.exports.persist = function persist(data, callback) {
    var client = new Client(data);
	client.save(function(err){
		if (err) {
			console.error(err);
			callback(err, null);
		} else {
			callback(null, client);
		}
	});
};

module.exports.removeOne = function remove(data, callback) {
	Client.findOneAndRemove(data, function(err, client){
		if (err) {
			callback(err, null);
		} else {
			callback(null, client)
		}
	});
};

module.exports.removeAll = function remove(data, callback) {
	Client.remove(data, function(err, clientCount){
		if (err) {
			callback(err, null);
		} else {
			callback(null, clientCount)
		}
	});
};


module.exports.locate = function locate(data, callback) {
    Client.findOne(data, function (err, clients) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, clients);
		}
	});
};