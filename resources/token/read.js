'use strict';

var validate = require('./validate');
var datastore = require('./../datastore');

module.exports = function getToken(req, res, next) {
    validate.isValid(req.params, function(err, value) {
        if (err === null ) {
            var key = value.study + '.' + value.resource;
            datastore.locate(key, function(err, token) {
                if (err) {
                    res.send(404, {'code': 'NotFound', 'message': 'Resource not found'});
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