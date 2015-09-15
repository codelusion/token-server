'use strict';

var http = require('http');
var PORT = process.env.PORT || 8000;

var uuid = require('node-uuid');
var app = require('express');

app.use(body)

http.createServer(
    function (req, res) {
        var keyPair = {
            id: uuid.v4(),
            secret: uuid.v4()
        };
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(keyPair));
    }
).listen(PORT);


console.log('server running on port: ' + PORT);
