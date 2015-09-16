'use strict';

var validate = require('./validate');
var datastore = require('./../datastore');

module.exports = function getToken(req, res, next) {
    validate.isValid(req.params, function(err, value) {
        if (err === null ) {
            var key = {study: value.study, resource: value.resource};
            datastore.locate(key, function(err, token) {
                if (err) {
                    res.send(500, {'code': 'DataBaseError', 'message': 'A database error occurred'});
                } else {
                    if (token) {
                        res.send(token);                        
                    } else {
                        res.send(404, {'code': 'NotFound', 'message': 'Resource was not found'});                           
                    }
                }
            });

        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};