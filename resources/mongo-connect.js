'use strict';
var config = require('./../config');
var mongoose = require('mongoose');

module.exports.connect = function connectToMongoDB() {
    var db = config.db.env === 'remote' ? config.db.remote : config.db.local;

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
};