'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Token', {
    study: String,
    resource: String,
    clientId: String,
    clientSecret: String,
    expires: Date
});