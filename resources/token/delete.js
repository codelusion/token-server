'use strict';

var validate = require('./validate');
var datastore = require('./../datastore');

module.exports = function deleteToken(req, res, next) {
    validate.isValid(req.params, function(err, value) {
        if (err === null ) {
            var key = value.study + '.' + value.resource;
            datastore.locate(key,function(err, token) {
               if (err) {
                   res.send(404, {'code': 'NotFound', 'message': 'Resource not found'});
               } else {
                   datastore.remove(key, function(err, token) {
                       if (err) {
                           console.log(err);
                           res.send(500, {'code': 'InternalError', 'message': 'An internal error occurred'});
                       } else {
                           res.send(204);
                       }
                   });
               }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};