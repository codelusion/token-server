'use strict';

var restify = require('restify');

var options = {
    name: 'token-server',
    version: '0.1.0'
};

var server = restify.createServer(options);

server.use(restify.bodyParser());

module.exports = server;


//enable logging via bunyan
//var bunyan = require('bunyan');
//server.on('after', restify.auditLogger({
//    log: bunyan.createLogger({
//        name: 'token-server',
//        stream: process.stdout
//    })
//}));
//
require('./routes');



