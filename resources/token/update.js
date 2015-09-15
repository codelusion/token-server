'use strict';

var uuid = require('node-uuid');



module.exports = function updateToken(req, res, next) {
    res.send( { 'id' : uuid.v4(), 'secret': uuid.v4()});
    next();
};