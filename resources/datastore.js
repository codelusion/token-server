'use strict';
var config = require('./../config');

var store = config.db;

module.exports.persist = function persist(key, data) {
    store.put(key, data);
};

module.exports.remove = function remove(key, callback) {
    store.del(key, callback);
};

module.exports.locate = function locate(key, callback) {
    return store.get(key, callback);
};