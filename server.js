'use strict';

var restify = require('restify');

var options = {
    name: 'oauth2-token-server',
    version: '0.1.0'
};

var server = restify.createServer(options);

module.exports = server;



