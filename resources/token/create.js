'use strict';

var uuid = require('node-uuid');
var datastore = require('./../datastore');
var validate = require('./validate');
var util = require('./util');

module.exports = function createToken(req, res, next) {
    validate.isValid(req.params, function(err, value) {
        if (err === null ) {
            var expires = new Date();
            expires.setDate(new Date().getDate() + 365);
            var token =                 {
                'apiId' : getApiId(),
                'apiSecret': uuid.v4(),
                'study': value.study,
                'resource': value.resource,
                'expires': expires
            };
            datastore.persist(token, function(err, token) {
                if (err) {
                    console.error(err);
                    res.send(500,  {'code': 'DatabaseError', 'message': 'A database error occurred'})
                } else {
                    res.send(util.format(token));
                }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};

function getApiId() {
    var min = 10000, max = 999999999;
    return 'ws' + Math.floor(Math.random() * (max - min)) + min;
}