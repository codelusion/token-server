'use strict';

var mongoose = require('mongoose');

module.exports.TokenSchema = mongoose.model('Token', {
    study: String,
    resource: String,
    clientId: String,
    clientSecret: { type: String, unique: true },
    expires: Date
});

module.exports.ClientSchema = mongoose.model('Client', {
    clientId: { type: String, unique: true },
    name: { type: String, unique: true }
});