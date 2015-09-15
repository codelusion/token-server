'use strict';

var restify = require('restify');

var options = {
    name: 'oauth2-token-server'
};

var server = restify.createServer(options);

module.exports = server;



