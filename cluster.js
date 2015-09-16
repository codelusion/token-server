'use strict';

var cluster = require('cluster');
var os = require('os');

var cpuCount = os.cpus().length;

if (cluster.isMaster) {
    // Master:
    // Fork as many workers as CPU cores
    for (var i = 0; i < cpuCount; ++i) {
        cluster.fork();
    }
} else {
    var server = require('./server');
    var PORT = process.env.PORT || 8000;
    server.listen(PORT, function(){
        console.log('server ('+ process.pid + ') running on %j: ' , server.address());
    });

}

