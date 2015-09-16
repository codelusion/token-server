'use strict';

var uuid = require('node-uuid');
var datastore = require('./../datastore');
var validate = require('./validate');

module.exports = function createToken(req, res, next) {
    validate.isValid(req.params, function(err, value) {
        if (err === null ) {
            var token =                 {
                'id' : uuid.v4(),
                'secret': uuid.v4(),
                'study': value.study,
                'resource': value.resource
            };
            datastore.persist(token, function(err, token) {
                if (err) {
                    console.error(err);
                    res.send(500,  {'code': 'DatabaseError', 'message': 'A database error occurred'})
                } else {
                    res.send(token);
                }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};